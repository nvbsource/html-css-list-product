let data = [];

const fetchData = ({ url }) => {
    return fetch(url).then((res) => res.json());
}

const renderData = async ({ isRenderFirst = false }) => {
    if (data.length == 0) {
        data = await fetchData({ url: "../js/data.json" });
    }
    if (data.length > 0 && isRenderFirst) {
        renderDetail(data[0]);
    }
    const contentHTMLListOrder = data.map(item => {
        return `<div class="product-item">
            <div class="product-item-information">
                <div class="product-item-thumb">
                    <div class="product-item-img">
                        <img src="${item.img}"
                            alt="">
                    </div>
                    <span class="product-item-date">${item.date}</span>
                </div>
                <div class="product-item-detail">
                    <div class="product-item-name">${item.name}</div>
                    <div class="product-item-phone">${item.phone}</div>
                    <div class="product-item-address">${item.address}</div>
                </div>
            </div>
            <div class="product-item-delivered">
            ${item.isDelivered ? "<span class='delivered'>Đã giao hàng</span>" : "<span class='deliver'>Chưa giao hàng</span>"}
            </div>
            <div class="product-item-view">
                <button class="product-item-view-button" id="view-detail" data-id="${item.id}">View</button>
            </div>
        </div>`;
    }).join("");
    document.querySelector("#product-list").innerHTML = contentHTMLListOrder;

    const buttonViews = document.querySelectorAll("#view-detail");
    buttonViews.forEach(item => item.addEventListener("click", handleChangeViewDetail))
}

const handleChangeViewDetail = (e) => {
    const id = e.target.dataset.id;
    const detail = data.find(item => item.id === Number(id));
    renderDetail(detail);
}

const renderDetail = (order) => {
    const eleCancelOrder = document.querySelector("#cancel-order");
    eleCancelOrder.setAttribute("data-id", order.id);
    eleCancelOrder.addEventListener("click", handleCancel);
    const eleDeliverOrder = document.querySelector("#deliver-order");
    eleDeliverOrder.setAttribute("data-id", order.id);
    eleDeliverOrder.addEventListener("click", handleDeliver);
    document.querySelector("#name-detail").innerHTML = order.author;
    document.querySelector("#phone-detail").innerHTML = order.phone;
    document.querySelector("#address-detail").innerHTML = order.address;
    document.querySelector("#time-ship-detail").innerHTML = "Giao hàng " + order.time_ship;
    const contentHTMLOrderDetails = order.order_details.map(item => {
        return `<div class="product-detail-body-item">
            <div class="product-detail-img">
                <img src="${item.img}"
                    alt="">
            </div>
            <div class="product-detail-show">
                <h5 class="product-detail-title">${item.name}</h5>
                <p class="product-detail-desc">${item.description}</p>
            </div>
        </div>`;
    }).join("");
    document.querySelector("#orders-detail").innerHTML = contentHTMLOrderDetails;
}

const handleCancel = (e) => {
    const id = e.target.dataset.id;
    const index = data.findIndex(item => item.id === Number(id));
    data.splice(index, 1);
    renderData({ isRenderFirst: true });
}

const handleDeliver = (e) => {
    const id = e.target.dataset.id;
    const order = data.find(item => item.id === Number(id));
    order.isDelivered = true;
    renderData({ isRenderFirst: false });
}


renderData({ isRenderFirst: true });