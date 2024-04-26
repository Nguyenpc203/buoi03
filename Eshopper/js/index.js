const URL_DATA = "https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=7b722634-f792-7f49-502e-5887708da831&category=8093&page=1&urlKey=pc-may-tinh-bo";

const MY_CART = JSON.parse(localStorage.getItem("MY_CART")) || [];
console.log(MY_CART);

const fetchDate = () => {
    let featuresItems = document.querySelector(".features_items");

    fetch(URL_DATA)
    .then(response => response.json())
    .then(data => {
        console.log(data.data); // data.data is an array of objects

        featuresItems.innerHTML = ""; // Clear previous content

        data.data.forEach(item => {
            const productHTML = `
            <div class="col-sm-4">
                <div class="product-image-wrapper">
                    <div class="single-products">
                        <div class="productinfo text-center">
                            <img src="${item.thumbnail_url}" alt="${item.name}" />
                            <h2>$${item.price}</h2>
                            <p>${item.name}</p>
                            <a href="#" class="btn btn-default add-to-cart" data-name="${item.name}" data-price="${item.price}" data-image="${item.thumbnail_url}"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                        </div>
                        <div class="product-overlay">
                            <div class="overlay-content">
                                <h2>$${item.price}</h2>
                                <p>${item.name}</p>
                                <a href="#" class="btn btn-default add-to-cart" data-name="${item.name}" data-price="${item.price}" data-image="${item.thumbnail_url}"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                            <li><a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                            <li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
                        </ul>
                    </div>
                </div>
            </div>`;

            featuresItems.innerHTML += productHTML;
        });

        // Add event listeners to "Add to cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        let nextId = 1;
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const name = button.dataset.name;
                const price = button.dataset.price;
                const image = button.dataset.image;
                
                const item_cart = {
                    id: nextId++,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                };

                alert("Đã thêm vào giỏ hàng");

                const existingItemIndex = MY_CART.findIndex(cartItem => cartItem.name === item_cart.name);
                if (existingItemIndex !== -1) {
                    MY_CART[existingItemIndex].quantity++;
                } else {
                    MY_CART.push(item_cart);
                }

                console.log(MY_CART);
                localStorage.setItem("MY_CART", JSON.stringify(MY_CART));
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

fetchDate();


// Lấy danh sách sản phẩm từ local storage
const cartItems = JSON.parse(localStorage.getItem("MY_CART")) || [];

// Lấy phần tử bảng
const tableBody = document.querySelector('.cart_info tbody');

// Xóa nội dung hiện tại của bảng
tableBody.innerHTML = '';

// Lặp qua từng sản phẩm trong giỏ hàng và thêm chúng vào bảng
cartItems.forEach(item => {
    // Tạo phần tử tr cho sản phẩm
    const cartHTML = `
        <tr>
        <td class="cart_product">
            <a href=""><img  style="width: 40px;"   src="${item.image}" alt=""></a>
        </td>
        <td class="cart_description">
            <h4 style="    overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 400px;" ><a href="">${item.name}</a></h4>
            <p>Web ID: 1089772</p>
        </td>
        <td class="cart_price">
            <p>$${item.price}</p>
        </td>
        <td class="cart_quantity">
            <div class="cart_quantity_button">
                <a class="cart_quantity_up" href="#" data-id="${item.id}"> + </a>
                <input class="cart_quantity_input" type="text" name="quantity" value="${item.quantity}" autocomplete="off" size="2">
                <a class="cart_quantity_down" href="#" data-id="${item.id}"> - </a>
            </div>
        </td>
        <td class="cart_total">
            <p class="cart_total_price" data-id="${item.id}">$59</p>
        </td>
        <td class="cart_delete">
            <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
        </td>
    </tr>`;

    tableBody.innerHTML += cartHTML;
    
});

// Hàm tính tổng giá trị của sản phẩm có id tương ứng
function calculateTotal(id) {
    // Tìm sản phẩm trong giỏ hàng có id tương ứng
    const item = MY_CART.find(item => item.id === id);
    
    // Nếu sản phẩm tồn tại, tính tổng giá trị
    if (item) {
        return item.price * item.quantity;
    }
    
    // Nếu không tìm thấy sản phẩm, trả về 0
    return 0;
}

// Lặp qua từng sản phẩm trong giỏ hàng
MY_CART.forEach(item => {
    // Lấy id của sản phẩm
    const id = item.id;

    // Tính toán tổng tiền của sản phẩm dựa trên id
    const totalPrice = calculateTotal(id);

    // Cập nhật phần tử HTML tương ứng với id của sản phẩm
    const cartTotalPrice = document.querySelector(`.cart_total_price[data-id="${id}"]`);
    if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${totalPrice}`;
    }
});



// Sự kiện khi nhấn vào nút tăng số lượng
document.querySelectorAll('.cart_quantity_up').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        const id = button.dataset.id;
        increaseQuantity(id);
    });
});

// Sự kiện khi nhấn vào nút giảm số lượng
document.querySelectorAll('.cart_quantity_down').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        const id = button.dataset.id;
        decreaseQuantity(id);
    });
});

// Hàm tăng số lượng của sản phẩm có id tương ứng
function increaseQuantity(id) {
    const itemIndex = MY_CART.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
        MY_CART[itemIndex].quantity++;
        updateCart();
        reloadPage(); // Tải lại trang sau khi cập nhật giỏ hàng
    }
}

// Hàm giảm số lượng của sản phẩm có id tương ứng
function decreaseQuantity(id) {
    const itemIndex = MY_CART.findIndex(item => item.id == id);
    if (itemIndex !== -1 && MY_CART[itemIndex].quantity > 1) {
        MY_CART[itemIndex].quantity--;
        updateCart();
        reloadPage(); // Tải lại trang sau khi cập nhật giỏ hàng
    }
}

// Hàm tải lại trang
function reloadPage() {
    location.reload(); // Tải lại trang web
}


// Hàm cập nhật giỏ hàng vào localStorage

function updateCart() {
    localStorage.setItem("MY_CART", JSON.stringify(MY_CART)); // Lưu lại giỏ hàng mới vào localStorage
}

// Thêm sự kiện click cho các phần tử có class 'cart_quantity_delete'
const deleteLinks = document.querySelectorAll('.cart_quantity_delete');
deleteLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

        const row = this.closest('tr'); // Lấy ra phần tử cha gần nhất có thẻ tr
        const productName = row.querySelector('.cart_description h4 a').textContent; // Lấy tên sản phẩm từ phần tử trong cùng của hàng

        // Xóa sản phẩm khỏi giỏ hàng dựa trên tên sản phẩm
        const index = MY_CART.findIndex(item => item.name === productName);
        if (index !== -1) {
            MY_CART.splice(index, 1);
            localStorage.setItem("MY_CART", JSON.stringify(MY_CART)); // Cập nhật lại giỏ hàng trong localStorage
            row.remove(); // Xóa hàng khỏi giao diện
           
        }
        alert(`Bạn có chắc xóa sản phẩm "${productName}" khỏi giỏ hàng.`);
    });
    
});

