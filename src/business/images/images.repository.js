async function httpUploadImage(req, res){

    try {

    }
    catch(error) {

        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

module.exports = {
    httpUploadImage,
}