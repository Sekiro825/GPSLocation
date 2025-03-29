// PetStoreService.js
export const fetchNearbyPetStores = async () => {
  // Hardcoded data for pet shops in Bandra
  return [
    {
      name: "Pet Lovers Point",
      lat: 18.546888,
      lon: 72.925835,
      address: "Alibaug",
      rating: 4.5,
      opening_hours: { open_now: true },
      image: "https://example.com/pet_lovers_point.jpg",
      description: "A popular pet shop with a wide range of products and services",
    },
    {
      name: "Shivani Pet Shop",
      lat: 18.546888,
      lon: 72.925835,
      address: "Alibaug",
      rating: 4.2,
      opening_hours: { open_now: true },
      image: "https://example.com/shivani_pet_shop.jpg",
      description: "A well-known pet shop in Alibaug",
    },
    {
      name: "Puppy Cuddles Dog Cafe",
      lat: 18.546888,
      lon: 72.925835,
      address: "Alibaug",
      rating: 5.0,
      opening_hours: { open_now: true },
      image: "https://example.com/puppy_cuddles_dog_cafe.jpg",
      description: "A unique dog cafe and pet shop",
    },
    {
      name: "Pawfect Pet Shop",
      lat: 18.546888,
      lon: 72.925835,
      address: "Alibaug",
      rating: 4.8,
      opening_hours: { open_now: true },
      image: "https://example.com/pawfect_pet_shop.jpg",
      description: "A pet shop with a variety of pet supplies and accessories",
    },
    {
      name: "Furry Friends Pet Store",
      lat: 18.546888,
      lon: 72.925835,
      address: "Alibaug",
      rating: 4.6,
      opening_hours: { open_now: true },
      image: "https://example.com/furry_friends_pet_store.jpg",
      description: "A friendly pet store with a great selection of products",
    },
  ];
};
