const groceryList = [
    {
      id: 1,
      name: "Lucky Me Pancit Canton",
      image_src:
        "https://store.iloilosupermart.com/wp-content/uploads/2020/05/87456456.jpg",
      price: 12.0,
    },
    {
      id: 2,
      name: "Datu Puti Vinegar",
      image_src:
        "https://ip.prod.freshop.retail.ncrcloud.com/resize?url=https://images.freshop.ncrcloud.com/8195470/f7186de5bd70439d53a6a757371ae2cb_large.png&width=512&type=webp&quality=90",
      price: 25.0,
    },
    {
      id: 3,
      name: "Purefoods Corned Beef",
      image_src:
        "https://rarefoodshop.com/cdn/shop/files/purefoods-corned-beef-380g-easy-open-ends-36892221571252_600x600.png?v=1705633289",
      price: 35.0,
    },
    {
      id: 4,
      name: "Nescafé Classic Coffee",
      image_src:
        "https://shopmetro.ph/angeles-supermarket/wp-content/uploads/2024/06/SM102072929-1-6.jpg",
      price: 60.0,
    },
    {
      id: 5,
      name: "Milo Powdered Drink",
      image_src:
        "https://medias.watsons.com.ph/publishing/WTCPH-50044940-front-zoom.jpg?version=1721945302",
      price: 50.0,
    },
    {
      id: 6,
      name: "SkyFlakes Crackers",
      image_src:
        "https://cdn.shopify.com/s/files/1/0147/9445/7136/files/image_b783332f-500a-47f3-a583-49fa8a07d8a7.jpg?v=1685972394",
      price: 8.0,
    },
    {
      id: 7,
      name: "Palmolive Shampoo",
      image_src:
        "https://www.palmolive.ph/content/dam/cp-sites/personal-care/palmolive-eu/en_ph/images/hair-care/ultra-smooth-new-en-ph.jpg",
      price: 5.0,
    },
    {
      id: 8,
      name: "Magnolia Chicken Breast",
      image_src:
        "https://ever.ph/cdn/shop/files/200000084692-Magnolia-Chicken-Breast-Fillet-500g-Frozen-Packed-20210820_9e19a23c-1b22-469a-952c-a429366e90dc_1200x1200.jpg?v=1725265552",
      price: 120.0,
    },
    {
      id: 9,
      name: "Silver Swan Soy Sauce",
      image_src:
        "https://shopsuki.ph/cdn/shop/files/4800344001413_600x600_crop_center.jpg?v=1717498036",
      price: 18.0,
    },
    {
      id: 10,
      name: "Century Tuna Flakes in Oil",
      image_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnR0iNeklHWPocf5qsLFHw6L9wdflszxq5sQ&s",
      price: 33.0,
    },
  ];
  
  let cart = [];
  
  // Function to display grocery list
  function displayGroceryList() {
    const groceryListContainer = document.getElementById("grocery-list");
    groceryListContainer.innerHTML = "";
  
    groceryList.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `
        <div class="product-container">
          <img class="product-image" src="${item.image_src}" alt="${item.name}" width="50" height="50">
          <h3>${item.name}</h3>
          <p>Price: PHP ${item.price}</p>
          <button class="product-button" onclick="addToCart(${item.id})">Add to Cart</button>
          </div>
        `;
      groceryListContainer.appendChild(itemDiv);
    });
  }
  
  
  
  // Function to add item to cart
  function addToCart(id) {
    const item = groceryList.find((product) => product.id === id);
    if (item) {
      const cartItem = cart.find((product) => product.id === id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      updateCart();
      updateCartCount();
    }
  }
  // Function to remove a product from the cart
  function removeFromCart(productId) {
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      updateCart(); // Update the cart display
      updateCartCount();
    }
  }
  
  // Function to increment the quantity of a product in the cart
  function incrementQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1; // Increment quantity
      updateCart(); // Update the cart display
      updateCartCount();
    }
  }
  
  // Function to decrement the quantity of a product in the cart
  function decrementQuantity(productId) {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1; // Decrement quantity
      updateCart(); // Update the cart display
      updateCartCount();
    }
  }
  
  // Function to display cart count in navbar
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems
  }
  
  
  // Function to display and update cart
  function updateCart() {
    const cartContainer = document.getElementById("cart");
    const totalPriceContainer = document.getElementById("total-price");
    cartContainer.innerHTML = "";
  
    let totalPrice = 0;
  
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.innerHTML = `
       <div class="product-container">
      <img class="product-image" src="${item.image_src}" alt="${item.name}" width="50" height="50">
          <h4>${item.name}</h4>
          <p>Price: PHP ${item.price} x ${item.quantity}</p>
          <div class="buttons-container">
           <button class="qty-button" onclick="decrementQuantity(${item.id})">-</button>
              <button class="qty-button" onclick="incrementQuantity(${item.id})">+</button>
              </div>
          <button onclick="removeFromCart(${item.id})">Remove</button>
           </div>
        `;
      cartContainer.appendChild(cartItemDiv);
  
      totalPrice += item.price * item.quantity;
    });
  
    totalPriceContainer.innerText = `Total: PHP ${totalPrice}`;
  }
  
  // // Initialize the grocery list display
  displayGroceryList();
  
  function goToSection(sectionId) {
    // window.location.hash = sectionId;
    document
      .getElementById(sectionId)
      .scrollIntoView({ block: "start", behavior: "smooth", inline: "nearest" });
  }
  
  function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = []; // Clear cart
        updateCart(); // Update cart display
        updateCartCount();
    }
  }
  
  