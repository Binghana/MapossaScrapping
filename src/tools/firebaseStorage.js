import storage from '@react-native-firebase/storage';
import { basePath, createFolder, downloadFile, readFile } from './fileSystem/fs';


/**
 * Cette fonction Reproduit l'arboresnce des fichiers et dossiers
 * consernet le scraping stockké sur firebase storage
 */
export async function initFile() {

    console.log("Créons le répertoire des dossiers sur le terminal")
    const path = basePath + "/scraping/operateurs"
    //await createFolder(parentFolder);
    // Listions les élements du dossier operateurs de storage
    const operatorsFolder = await storage().ref("/scraping/operateurs").list();

    await setUpFolder(path, operatorsFolder);

}
/**
 * Cette fonction crée un provenant de storage puis télécharge son contenu
 * 
 * @param {string} path représente le chemin d'accès vers le fichier ou dossier 
 * @param { FirebaseStorageTypes.ListResult } content représente le contenu du dossier "operateurs" 
 */
export async function setUpFolder(path, content) {

    console.log("nous nous situons dans " + path)
    if ("prefixes" in content) {

        console.log(content.prefixes.length)

        if (content.prefixes.length > 0) {

            console.log("Il ya " + content.prefixes.length + " sous dossiers")

            await content.prefixes.reduce(async (acc, folder) => {
                await acc
                console.log("Commencons à créer les sous-dossiers")
                await setUpFolder(`${path}/${folder.name}`, await folder.list())
            }, Promise.resolve())
        }
    }
    else {
        console.log("Il n'ya pas de sous dossiers dans le dossier " + path)
    }
    console.log("Créons le dossier à l'adresse " + path)
    await createFolder(path);
    console.log("Le dossier à l'adresse " + path + " a été crée avec succès")

    await content.items.reduce(async (acc, file) => {
        await acc;
        const url = await file.getDownloadURL();
        console.log("Début téléchargement du fichier : " + file.name + " dans le dossier" + path)
        await downloadFile(url, `${path}/${file.name}`).promise;

        let content = await readFile(`${path}/${file.name}`);
        console.log(content)

        console.log("Fin du téléchargement du fichier : " + file.name + " dans le dossier" + path)
    }, Promise.resolve())

    console.log("Tous les fichiers du dossier " + path + " ont été téléchargés avec succès")
    console.log("Fin de l'initialisation")


}