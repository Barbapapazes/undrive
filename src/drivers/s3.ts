import { Readable } from "node:stream";
import { S3Client, HeadObjectCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import getStream from "get-stream"
import { createError, defineDriver } from "./utils";

export interface S3DriverOptions {
  key: string;
  secret: string;
  bucket: string;
  region?: string;
}

export default defineDriver((options: S3DriverOptions) => {
  const driver = "s3";

  const bucket = options.bucket;
  const client = new S3Client({
    region: options.region,
    credentials: {
      accessKeyId: options.key,
      secretAccessKey: options.secret
    }
  })

  return {
    name: driver,
    exists: async (location) => {
      try {
        await client.send(new HeadObjectCommand({
          Key: location,
          Bucket: bucket
        }));

        return true
      } catch (error) {
        if (error.$metadata.httpStatusCode === 404) {
          return false
        }

        throw createError(driver, error.message)
      }
    },
    get: async (location) => {
      const response = await client.send(new GetObjectCommand({
        Key: location,
        Bucket: bucket
      }));

      const body = response.Body as Readable

      return getStream(body)
    },
    put: async (location, contents) => {
      try {
        await client.send(new PutObjectCommand({
          Key: location,
          Bucket: bucket,
          Body: contents
        }));
      }
      catch (error) {
        throw createError(driver, error.message)
      }
    }
  }
});
