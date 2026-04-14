//Para passar a imagem ao Insominia 
import createMulter from "../configs/upload.multer.js";

 const uploadImage = createMulter ({
    pasta: 'Imagens', 
    tiposPermitidos: ['image/png', 'image/jpeg'],
    tamanhoArquivo: 10 * 1024 *1024 //10MB
 }).single('image');

 export default uploadImage;