export const getUrlImageFromFileList = ({ fileList }: { fileList: FileList }): string | null => {
    try {
        //Controlled error in fileList.item(0)
        if(fileList.item(0)) return URL.createObjectURL(fileList.item(0) ?? new Blob())
        return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return null;
    }
}