import AWS from "aws-sdk";


const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_IAM_USER_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_IAM_USER_SECRET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const handleUpload = (file) => {
    // Buffer.from(file,'base64');
    const folder = "josh" + "/";
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: folder + file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };