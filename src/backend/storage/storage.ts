export default interface Storage {
    ListBuckets(): Promise<string[]>
    HeadObject(bucket: string, key: string): Promise<ObjectInfo>;
    PutFile(req: PutFileReq): Promise<PutFileResp>;
    ListObjects(req: ListObjectsReq): Promise<ListObjectsResp>;
    InitMPut(req: InitMPutReq): Promise<InitMPutResp>;
    MputUpload(req: MPutUploadReq): Promise<MPutUploadResp>;
    MputAbort(req: MPutAbortReq): Promise<MPutAbortResp>;
    MputFinish(req: MPutFinishReq): Promise<MPutFinishResp>;
    GetFile(req: GetFileReq): Promise<GetFileResp>;
    DeleteFile(req: DeleteFileReq): Promise<DeleteFileResp>;
    Rename(req: RenameReq): Promise<RenameResp>;
    Copy(req: CopyReq): Promise<void>;
}

export interface ListBucketsReq {}
export interface ListBucketsResp {}

export interface ListObjectsReq {
    Delimiter: string;
    Prefix: string;
    Max: number;
    Marker: string;
}

export interface ListObjectsResp {
    IsTrunc: boolean;
    Objects: ObjectInfo[];
    CommonPrefixes: string[];
    Marker: string;
}

export interface ObjectInfo {
    Key: string;
    Size: number; // bytes  
    Mtime: Date;
    Ctime: Date;
    Uid: number | null;
    Gid: number | null;
    Mode: number | null;
    Metadata: { [key: string]: string };
    Storage_class?: string;
}

export interface PutFileReq {
    Buf: ReadableStream;
    BufLen: number;
    Key: string;
    MetaData: { [key: string]: string };
}

export interface PutFileResp {
    Etag: string;
}

export interface StatImpl {
    getEtags(): { [key: number]: string };
}

export interface MPutStat {
    PartSize: number;
    Stat: StatImpl;
    MputId: string;
}

export interface InitMPutReq {
    Key: string;
}

export interface InitMPutResp {
    Stat: MPutStat;
}

export interface MPutUploadReq {
    Stat: MPutStat;
    PartNo: number;
    Data: MPutFile;
    Key: string;
}

export interface MPutFile {
    Buffer: number[];
    IsLast: boolean;
}

export interface MPutUploadResp {
    Etags: string[];
    PartSizeErr: boolean;
}

export interface MPutAbortReq {
    Key: string;
    Stat: MPutStat;
}

export interface MPutAbortResp { }

export interface MPutFinishReq {
    Key: string;
    Stat: MPutStat;
}

export interface MPutFinishResp { }

export interface GetFileReq {
    Offset: number;
    Length: number;
    Key: string;
}

export interface GetFileResp {
    Body: ReadableStreamDefaultReader;
}

export interface DeleteFileReq {
    Key: string
}

export interface DeleteFileResp { }

export interface RenameReq {
    Src: string
    Dst: string
}

export interface RenameResp { }

export interface CopyReq { 
    Src: string 
    Dst: string
}