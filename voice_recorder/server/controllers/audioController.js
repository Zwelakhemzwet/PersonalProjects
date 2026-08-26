const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Recording = require('../models/Recording');

const config = require('../constants/constants');

// Ensure uploads directory exists
if (!fs.existsSync(config.UPLOADS_DIR)) {
  fs.mkdirSync(config.UPLOADS_DIR, { recursive: true });
}

// Load metadata database
const loadMetadata = () => {
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// Save metadata database
const saveMetadata = (metadata) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(metadata, null, 2));
};

exports.uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const metadata = req.body.metadata || '{}';//JSON.parse(req.body.metadata || '{}');
    const fileUrl = req.file.path.startsWith('/') ? req.file.path : `/${req.file.path}`;
    const audioMetadata = {
      //id: uuidv4(),
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadDate: new Date().toISOString(),
      metadata: metadata,
      url: fileUrl
    };

    //const db = loadMetadata();
    //db.push(audioMetadata);
    //saveMetadata(db);
    const recording = new Recording(audioMetadata);
    await recording.save();

    res.status(201).json({
      message: 'Audio uploaded successfully',
      file: { id: recording._id, ...audioMetadata },
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload audio' });
  }
};

exports.getAllAudio = async (req, res) => {
  try {
    const recordings = (await Recording.find()).map(r => ({ id: r._id, filename: r.filename, originalName: r.originalName, size: r.size, uploadDate: r.uploadDate, url: r.url, metadata: r.metadata }));
    //const db = loadMetadata();
    res.json({ files: recordings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch audio files' });
  }
};

exports.getAudio = async (req, res) => {
  try {
    //const db = loadMetadata();
    const file = await Recording.find({ _id: req.params.id });

    if (!file) {
      return res.status(404).json({ error: 'Audio file not found' });
    }

    file['id'] = file._id;

    res.json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audio file' });
  }
};

exports.deleteAudio = async (req, res) => {
  try {
    //const db = loadMetadata();
    console.log("deleting R-id: ", req.params.id);
    let recording = await Recording.find({ _id: req.params.id })
    //const fileIndex = db.findIndex(f => f.id === req.params.id);

    if (!recording || recording.length <= 0) {
      return res.status(404).json({ error: 'Audio file not found' });
    }
    recording = recording[0];

    // Delete physical file
    const filePath = path.join(config.UPLOADS_DIR, recording.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Recording.deleteOne({ _id: recording._id });
    // Remove from database
    //db.splice(fileIndex, 1);
    //saveMetadata(db);

    res.json({ message: 'Audio file deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete audio file' });
  }
};

exports.downloadAudio = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(config.UPLOADS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
};