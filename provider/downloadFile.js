module.exports = async function downloadFile(req, res) {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
    if (!file) {
        return res.status(404).json({
            message: 'File not found'
        });
    }
    const filePath = path.join(__dirname, '../../', file.path);
    res.download(filePath, file.name);
}