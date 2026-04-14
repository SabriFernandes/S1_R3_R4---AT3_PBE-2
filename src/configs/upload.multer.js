import multer from "multer";
import path from 'path';
import crypto from 'crypto'; //Gerar um númeração
import fs from 'fs'; //Biblioteca
import { dir } from "console";

const baseUploadDir = path.resolve(process.cwd(), 'uploads'); //uploads é a raiz 

const verificarDir = (dir) => { //dir => diretorio
    if (!fs.existsSync(dir)) { //! para caso não haja faça ao contrário
        fs.mkdirSync(dir, { recursive: true });
    }
}

const createMulter = ({ pasta, tiposPermitidos, tamanhoArquivo }) => {
    const pastaFinal = path.join(baseUploadDir, pasta);
    verificarDir(pastaFinal);
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, pastaFinal)
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(12).toString('hex')//O hex pode ser trocado pelo ID
            cb(null, `${hash}-${file.originalname}`)
        } //construindo um nome do arquivo.
    });
    const fileFilter = (req, file, cb) => {
        if (!tiposPermitidos.includes(file.mimetype)) {
            return cb(new Error("Tipo do arquivo não permitido"));
        }
        cb(null, true);
    }
    return multer({
        storage,
        limits: { fileSize: tamanhoArquivo },
        fileFilter
    })
}

export default createMulter //Exportar o createMulter