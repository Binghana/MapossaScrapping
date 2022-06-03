import RNFS from "react-native-fs";

export const basePath = RNFS.ExternalDirectoryPath;

// }
export async function createFolder(path) {

 return RNFS.mkdir(path)
}

export function downloadFile( fromUrl , toFile ) {
    const options = {
        fromUrl : fromUrl,
        toFile : toFile   
        //     fromUrl: string;          // URL to download file from
        //     toFile: string;           // Local filesystem path to save the file to
        //     headers?: Headers;        // An object of headers to be passed to the server
        //     background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
        //     discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
        //     cacheable?: boolean;      // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
        //     progressInterval?: number;
        //     progressDivider?: number;
        //     begin?: (res: DownloadBeginCallbackResult) => void; // Note: it is required when progress prop provided
        //     progress?: (res: DownloadProgressCallbackResult) => void;
        //     resumable?: () => void;    // only supported on iOS yet
        //     connectionTimeout?: number // only supported on Android yet
        // readTimeout?: number       // supported on Android and iOS
        // backgroundTimeout?: number // Maximum time (in milliseconds) to download an entire resource (iOS only, useful for timing out background downloads)
     
    }
    return RNFS.downloadFile(options)
}

export function readFile(path) {

    return RNFS.readFile(path)
}