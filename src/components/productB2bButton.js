/**
 * product-b2b-button
 * @template 
 */

if(typeof ProductJS !== 'object') {
    var ProductJS = {};
}

if(typeof ProductJS.Components !== 'object') {
  ProductJS.Components = {};
}

ProductJS.Components.productB2bButtonCtr = function (element, data) {
  var controller = this;
  controller.product = data.product;
  controller.$element = $(element);

  if(!ProductJS.Utilities.isArray(controller.product.b2b_cart)) {
      controller.product.b2b_cart = [];
  }

  controller.add = function () {
    ProductJS.B2bCart.add(controller.product, controller.product.variant, {
      removeEmpty: false,
      sumQuantity: false,
    });
  }

  controller.remove = function () {
    var $button = $(this);
    var index = ProductJS.B2bCart.getItem(controller.product.b2b_cart, controller.product.variant.id);
    controller.product = ProductJS.B2bCart.remove(controller.product, controller.product.variant, { resetQuantity: true })
  }

}

rivets.components['product-b2b-button'] = {
  template: function() {
    return ProductJS.templates.productB2bButton;
  },

  initialize: function(el, data) {
    if(!data.product) {
      console.error(new Error("product attribute is required"));
    }
    return new ProductJS.Components.productB2bButtonCtr(el, data);
  }
}