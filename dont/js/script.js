// Product data
        const products = {
            1: {
                name: "Classic Logo Tee",
                price: 49.99,
                description: "Our signature Classic Logo Tee features the iconic لا تكذب branding in a minimalist design. Crafted from premium cotton for ultimate comfort.",
                image: "street/shirts/lilbaby.jpg"
            },
            2: {
                name: "Graphic Print Tee",
                price: 59.99,
                description: "This Graphic Print Tee features an artistic interpretation of our brand philosophy. The distressed print gives it a unique, edgy look.",
                image: "street/shirts/white t shirt.webp"
            },
            3: {
                name: "Oversized Tee",
                price: 54.99,
                description: "The Oversized Tee offers a relaxed fit with a contemporary streetwear silhouette. Perfect for layering or wearing on its own.",
                image: "street/shirts/ydwtl-tee-shirt-s-black-redline-oversized-t-shirt-you-dont-want-this-life-uk-streetwear-brand-5451103076396_620x.webp"
            },
            4: {
                name: "Limited Edition Tee",
                price: 69.99,
                description: "This Limited Edition Tee features exclusive artwork with Arabic calligraphy elements. Only a limited number of these shirts were produced.",
                image: "street/hoodies/hoodies.jpg"
            },
            5: {
                name: "Classic Hoodie",
                price: 89.99,
                description: "Our Classic Hoodie features the لا تكذب logo embroidered on the chest. Made from heavyweight cotton for warmth and durability.",
                image: "street/hoodies/71aj0OahgeL._UY1000_.jpg"
            },
            6: {
                name: "Zip-Up Hoodie",
                price: 99.99,
                description: "The Zip-Up Hoodie offers versatile styling with a full-zip front. Features ribbed cuffs and hem for a secure fit.",
                image: "street/hoodies/hodievert.jpg"
            },
            7: {
                name: "Oversized Hoodie",
                price: 94.99,
                description: "Our Oversized Hoodie provides an exaggerated fit for maximum comfort. Features a kangaroo pocket and dropped shoulders.",
                image: "street/pants/blackpants.webp"
            },
            8: {
                name: "Limited Edition Hoodie",
                price: 109.99,
                description: "This Limited Edition Hoodie features special graphic prints on the back and sleeves. Made from premium materials for exceptional quality.",
                image: "street/pants/jappanese.png"
            },
            9: {
                name: "Slim Fit Pants",
                price: 79.99,
                description: "Our Slim Fit Pants offer a tailored look with stretch fabric for comfort. Perfect for both casual and dressed-up occasions.",
                image: "street/pants/pant.jpg"
            },
            10: {
                name: "Cargo Pants",
                price: 89.99,
                description: "The Cargo Pants combine utility with style, featuring multiple pockets and a relaxed fit. Made from durable cotton twill.",
                image: "street/accesoires/Bague-Streetwear--Kyoto-Hono--Japanstreet-1623859247.webp"
            },
            11: {
                name: "Logo Cap",
                price: 39.99,
                description: "The Logo Cap features the لا تكذب branding embroidered on the front. Adjustable strap for a custom fit.",
                image: "street/accesoires/belt.webp"
            },
            12: {
                name: "Leather Belt",
                price: 49.99,
                description: "Our Leather Belt is made from genuine leather with a polished metal buckle featuring the brand logo. Available in multiple sizes.",
                image: "street/accesoires/jewer.webp"
            }
        };

        // Cart functionality
        const cart = {
            items: [],
            total: 0,
            
            addItem: function(product, size, color) {
                const cartItem = {
                    ...product,
                    size,
                    color,
                    quantity: 1
                };
                this.items.push(cartItem);
                this.total += product.price;
                this.updateCartDisplay();
                this.showCartNotification(product.name);
            },
            
            removeItem: function(index) {
                this.total -= this.items[index].price * this.items[index].quantity;
                this.items.splice(index, 1);
                this.updateCartDisplay();
            },
            
            updateCartDisplay: function() {
                const cartCount = document.querySelector('.cart-count');
                const cartItemsContainer = document.querySelector('.cart-items');
                const totalAmount = document.querySelector('.total-amount');
                
                // Update cart count
                cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
                
                // Update cart items
                cartItemsContainer.innerHTML = '';
                this.items.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                  cartItem.innerHTML = `
    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
    <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div>Size: ${item.size} | Color: ${item.color}</div>

        <div class="quantity-controls">
            <button class="quantity-btn decrease" data-index="${index}">−</button>
            <span class="item-qty">${item.quantity}</span>
            <button class="quantity-btn increase" data-index="${index}">+</button>
        </div>
    </div>
`;

                    cartItemsContainer.appendChild(cartItem);
                });
                
                // Update total
                totalAmount.textContent = `$${this.total.toFixed(2)}`;
                
                // Add event listeners to remove buttons
                document.querySelectorAll('.btn-remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const index = parseInt(e.target.getAttribute('data-index'));
                        this.removeItem(index);
                    });
                });
                // Quantity control buttons
document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
    btn.addEventListener('click', e => {
        const index = parseInt(e.target.getAttribute('data-index'));
        cart.items[index].quantity += 1;
        cart.total += cart.items[index].price;
        cart.updateCartDisplay();
    });
});

document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
    btn.addEventListener('click', e => {
        const index = parseInt(e.target.getAttribute('data-index'));
        if (cart.items[index].quantity > 1) {
            cart.items[index].quantity -= 1;
            cart.total -= cart.items[index].price;
        } else {
            cart.total -= cart.items[index].price;
            cart.items.splice(index, 1);
        }
        cart.updateCartDisplay();
    });
});

            },
            
            showCartNotification: function(productName) {
                const notification = document.createElement('div');
                notification.className = 'cart-notification';
                notification.innerHTML = `
                    <div class="cart-notification-content">
                        <i class="fas fa-check-circle"></i>
                        ${productName} added to cart
                    </div>
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            }
        };

        // Initialize product modal
        const productModal = new bootstrap.Modal(document.getElementById('productModal'));
        let currentProductId = null;

        // View product details
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product');
                const product = products[productId];
                currentProductId = productId;
                
                // Update modal content
                document.querySelector('#productModal .modal-title').textContent = product.name;
                document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
                document.getElementById('modalProductDescription').textContent = product.description;
                document.getElementById('modalProductImg').src = product.image;
                
                // Show modal
                productModal.show();
            });
        });

        // Add to cart from modal
        document.getElementById('addToCartBtn').addEventListener('click', function() {
            if (currentProductId) {
                const product = products[currentProductId];
                const size = document.querySelector('input[name="size"]:checked').value;
                const color = document.querySelector('input[name="color"]:checked').value;
                
                cart.addItem(product, size, color);
                productModal.hide();
            }
        });

        // Toggle cart preview
        document.querySelector('.cart-icon').addEventListener('click', function() {
            document.querySelector('.cart-preview').classList.toggle('active');
        });

        // Collection filtering
        document.querySelectorAll('.collection-nav-item').forEach(item => {
            item.addEventListener('click', function() {
                // Update active state
                document.querySelectorAll('.collection-nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter products
                const collection = this.getAttribute('data-collection');
                document.querySelectorAll('.product-item').forEach(product => {
                    if (collection === 'all' || product.getAttribute('data-collection') === collection) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
        
        document.getElementById('viewCartBtn').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.cart-preview').classList.remove('active');
});

document.querySelector('.cart-close-btn').addEventListener('click', function () {
    document.querySelector('.cart-preview').classList.remove('active');
});

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Animate elements when they come into view
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.fade-in-up');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('animate__animated', 'animate__fadeInUp');
                }
            });
            if (elementPosition < windowHeight - 100) {
    element.classList.add('show');
}
        };
        
        // Run on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Style for cart notification
        const style = document.createElement('style');
        style.textContent = `
            .cart-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: var(--matte-black);
                color: white;
                padding: 15px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
                z-index: 1100;
                border-left: 4px solid var(--blood-red);
            }
            
            .cart-notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .cart-notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .cart-notification i {
                color: var(--blood-red);
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);

    
    // Show checkout form when "Buy Now" is clicked
    document.getElementById('buyNowBtn').addEventListener('click', function (e) {
    e.preventDefault();

    // CLOSE the cart preview
    document.querySelector('.cart-preview').classList.remove('active');

    // SHOW the checkout form
    document.getElementById('checkoutSection').style.display = 'block';
    window.scrollTo({ 
        top: document.getElementById('checkoutSection').offsetTop, 
        behavior: 'smooth' 
    });
});


    // Handle checkout form submission
    document.getElementById('checkoutForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phoneNumber').value.trim();
        const address = document.getElementById('shippingAddress').value.trim();

        if (name && phone && address) {
            alert(`Thanks, ${name}! We received your order.\nWe'll contact you soon.`);
            this.reset();
        } else {
            alert("Please fill out all the fields.");
        }
    });

