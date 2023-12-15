import ModelCake from "../models/ModelCake.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploads = multer({ storage: storage });

export const getCake = async (req, res) => {
  try {
    const response = await ModelCake.findAll();

    if (!response[0]) return res.status(404).json({ message: "Daftar cake masih kosong!" });

    return res.status(200).json({ result: response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createCake = async (req, res) => {
  try {
    const { nameCake, harga, desc } = req.body;
    if (nameCake === "") return res.status(400).json({ message: "Nama cake tidak boleh kosong!" });
    if (harga === null) return res.status(400).json({ message: "Harga cake tidak boleh kosong!" });
    if (desc === "") return res.status(400).json({ message: "Deskripsi cake tidak boleh kosong!" });

    if (req.file) {
      const image = req.file.filename;
      const url = `${req.protocol}://${req.get("host")}/public/images/${image}`;
      await ModelCake.create({
        cake: nameCake,
        harga: harga,
        desc: desc,
        image: image,
        url: url,
      });
    } else {
      return res.status(400).json({ message: "Gambar harus di inputkan!" });
    }

    return res.status(201).json({ result: "Cake berhasil di simpan!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
