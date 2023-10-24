import Storage, { 
    CopyReq, 
    DeleteFileReq, 
    DeleteFileResp, 
    GetFileReq, 
    GetFileResp, 
    InitMPutReq, 
    InitMPutResp, 
    ListObjectsReq, 
    ListObjectsResp, 
    MPutAbortReq, 
    MPutAbortResp, 
    MPutFinishReq, 
    MPutFinishResp, 
    MPutUploadReq, 
    MPutUploadResp, 
    ObjectInfo, 
    PutFileReq, 
    PutFileResp, 
    RenameReq, 
    RenameResp 
} from "./storage";

import { S3Client, ListBucketsCommand, HeadObjectCommand } from "@aws-sdk/client-s3";

export default class S3Storage implements Storage {

    s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({ 
            endpoint: "s3-cn-bj.ufileos.com",
            credentials: {
                accessKeyId: "TOKEN_c1917895-17b8-4fe1-9edf-2418d2ce15d0",
                secretAccessKey: "3f2f6f25-77a7-42f5-8522-110b82d9a92a",
            },
        });
    }

    async ListBuckets(): Promise<string[]> {
        const command = new ListBucketsCommand({});
        const resp = await this.s3Client.send(command)
        let buckets: string[] = []
        for (let item of resp.Buckets!) {
            buckets.push(item.Name!)
        }
        return buckets
    }

    async HeadObject(bucket: string, key: string): Promise<ObjectInfo> {
        const cmd = new HeadObjectCommand({Bucket: bucket, Key: key});
        const resp = await this.s3Client.send(cmd);
        let obj: ObjectInfo = {
            Key: key,
            Size: resp.ContentLength!,  
            Mtime: resp.LastModified!,
            Ctime: resp.LastModified!,
            Uid:  Number(resp.Metadata!["uid"]),
            Gid:  Number(resp.Metadata!["gid"]),
            Mode: Number(resp.Metadata!["mode"]),
            Metadata: resp.Metadata!,
            Storage_class: resp.StorageClass,
        }
        return obj
    }

    PutFile(req: PutFileReq): Promise<PutFileResp> {
        throw new Error("Method not implemented.");
    }
    ListObjects(req: ListObjectsReq): Promise<ListObjectsResp> {
        throw new Error("Method not implemented.");
    }
    InitMPut(req: InitMPutReq): Promise<InitMPutResp> {
        throw new Error("Method not implemented.");
    }
    MputUpload(req: MPutUploadReq): Promise<MPutUploadResp> {
        throw new Error("Method not implemented.");
    }
    MputAbort(req: MPutAbortReq): Promise<MPutAbortResp> {
        throw new Error("Method not implemented.");
    }
    MputFinish(req: MPutFinishReq): Promise<MPutFinishResp> {
        throw new Error("Method not implemented.");
    }
    GetFile(req: GetFileReq): Promise<GetFileResp> {
        throw new Error("Method not implemented.");
    }
    DeleteFile(req: DeleteFileReq): Promise<DeleteFileResp> {
        throw new Error("Method not implemented.");
    }
    Rename(req: RenameReq): Promise<RenameResp> {
        throw new Error("Method not implemented.");
    }
    Copy(req: CopyReq): Promise<void> {
        throw new Error("Method not implemented.");
    }

   
}