const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  heroImage:{
    type:String,
    default:"",
    required:false
  },
  aboutImage:{
    type:String,
    default:"",
    required:false
  },
  hotelImages: [{
    title: {
      type: String,
      default:"",
      required:false
    },
    img: {
      type: String,
      default:"",
      required:false
    }
  }],
  bottomBanner:{
    type:String,
    default:"",
    required:false
  },
  contacts:[{
    type:String,
  }
  ],
  defaultPrice:{
    type:String,
    default:"499.99"
  },
  featuresContent: [{
    title: {
      type: String,
      required: false // Assuming title is always required
    },
    content: {
      type: [String],
      required: false // Assuming content is always required
    }
  }]
});

const HotelModel = mongoose.model('Hotel', HotelSchema);

module.exports = HotelModel;
