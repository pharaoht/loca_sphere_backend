const cloudinary = require('cloudinary').v2;
require('dotenv').config();

class ImageUploadService {

    constructor(){

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

    };

    static async deleteImage( imageUrl, ) {

        const publicId = imageUrl

        try {

            console.log('**deleting image**');

            await cloudinary.uploader.destroy(publicId);

            console.log('**image deletion successful**')

            return true;

        } catch (error) {
        
            console.log('**image deletion failed**');

            console.log(error, error.message)

            return false;

        }
    }

    static async uploadImage( imageUrl, folder = 'loca_sphere' ){

        console.log('uploading image....');
    
        try {

            const uploadResult = await cloudinary.uploader.upload(
                imageUrl,
                {
                    folder: folder,
                    resource_type: 'image',
                    transformation: [
                        { aspect_ratio: '16:9', width: 540, crop: 'fill' },
                        { fetch_format: 'auto', format: 'avif' }
                    ]
                }
            );

            console.log('**!Successful upload!**');

            return uploadResult;
           
        } catch (error) {

            console.error('Error uploading image:', error);

            throw error;
        }
    }

    static transformImage(url){
        const imgStr = cloudinary.url(url.split('/')[1], {
            transformation: [
                {width: 500, crop: 'scale'},
                {quality: 'best'},
                {fetch_format: 'auto'}
            ]
        });

        return imgStr;
    }
};

module.exports = ImageUploadService;
