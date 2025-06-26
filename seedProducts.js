const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = 'mongodb://localhost:27017/f-ecom'; // Change to your DB name

const sampleProducts = [
  {
    name: 'Olive Button-Up Shirt',
    price: 49.99,
    description: 'Stylish olive green button-up shirt for men, perfect for casual and semi-formal occasions.',
    category: 'Men\'s Clothing',
    stock: 25,
    images: [{ 
      url: "https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20of%20a%20female%20model%20wearing%20a%20light%20pink%20blush%20summer%20dress%20with%20a%20simple%20elegant%20design%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style&width=300&height=400&seq=9&orientation=portrait", 
      public_id: 'shirt_1' 
    }],
    rating: 4.5,
    numReviews: 2,
    reviews: [
      {
        user: new mongoose.Types.ObjectId(),
        rating: 5,
        comment: 'Excellent quality and perfect fit!',
      },
      {
        user: new mongoose.Types.ObjectId(),
        rating: 4,
        comment: 'Very comfortable fabric',
      }
    ]
  },
  {
    name: 'Floral Summer Dress',
    price: 59.99,
    description: 'Beautiful floral pattern summer dress with flowy design for women.',
    category: 'Women\'s Clothing',
    stock: 15,
    images: [{ 
      url: "https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20of%20a%20female%20model%20wearing%20a%20light%20purple%20pastel%20pleated%20skirt%20with%20a%20white%20top%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style&width=300&height=400&seq=8&orientation=portrait", 
      public_id: 'dress_1' 
    }],
    rating: 4.0,
    numReviews: 1,
    reviews: [
      {
        user: new mongoose.Types.ObjectId(),
        rating: 4,
        comment: 'Love the pattern and comfortable fit!',
      }
    ]
  },
  {
    name: 'Floral Summer Dressss',
    price: 79.99,
    description: 'Beautiful floral pattern summer dress with flowy design for women.',
    category: 'Women\'s Clothing',
    stock: 15,
    images: [{ 
      url: "https://readdy.ai/api/search-image?query=Professional%20fashion%20photograph%20of%20a%20female%20model%20wearing%20a%20light%20purple%20pastel%20pleated%20skirt%20with%20a%20white%20top%2C%20neutral%20background%2C%20clean%20minimal%20fashion%20photography%2C%20soft%20lighting%2C%20high-end%20fashion%20catalog%20style&width=300&height=400&seq=8&orientation=portrait", 
      public_id: 'dress_1' 
    }],
    rating: 4.0,
    numReviews: 1,
    reviews: [
      {
        user: new mongoose.Types.ObjectId(),
        rating: 4,
        comment: 'Love the pattern and comfortable fit!',
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();