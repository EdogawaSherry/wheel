'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var imgInfo = {
    width: null,
    height: null,
    rotate: 0,
    scale: 1
};

var cropperIng = void 0;
// jq对象 cropper的宿主
var cropperTarget = void 0;
// jq对象 裁剪实时呈现的效果图像
var userImg = void 0;
// 裁剪图片功能封装类

var UpdateCropper = function () {
    // 回调方法
    function UpdateCropper(callBack) {
        _classCallCheck(this, UpdateCropper);

        this.callBack = callBack;
    }

    _createClass(UpdateCropper, [{
        key: 'init',
        value: function init() {
            imgInfo.width = null;
            imgInfo.height = null;
            imgInfo.rotate = 0;
            imgInfo.scale = 1;
            cropperIng = false;
            cropperTarget = $('#J-update-img');
            userImg = $('#J-update-user-header');
            $('#J-update-wrapper').fadeIn('slow');
            this.addEvent();
        }
    }, {
        key: 'addEvent',
        value: function addEvent() {
            var _this2 = this;

            var _this = this;
            $('#J-update-img-file').on('change', function (e) {
                if (!this.files[0].type.match(/image.*/)) {
                    alert('请选择正确的图片!');
                }
                var imgSrc = URL.createObjectURL(this.files[0]);
                _this.createCropper(imgSrc);
            });
            $('#J-update-wrapper').on('click', '.J-close', function () {
                _this2.destroy();
            });
            $('#J-update-wrapper').on('click', '.J-update-btn', function () {
                document.getElementById('J-update-img-file').click();
            });
            // 操作按钮
            $('#J-update-wrapper').on('click', '.J-operation-btn', function () {
                _this.operation($(this));
            });
            $('#J-update-wrapper').on('click', '.J-operation-save', function () {
                _this2.getCroppedCanvas();
            });
            // J-close
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.removeEvent();
            cropperTarget.cropper('destroy');
            userImg.attr('src', '').hide();
            cropperTarget.attr('src', '').hide();
            $('#J-update-wrapper').fadeOut('slow');
            // $('#J-update-wrapper').hide();
        }
    }, {
        key: 'removeEvent',
        value: function removeEvent() {
            $('#J-update-img-file').off();
            $('#J-update-wrapper').off();
        }
        /**
         * 创建cropper容器 巴拉巴拉
         * @param {string} src 
         */

    }, {
        key: 'createCropper',
        value: function createCropper(src) {
            var _this3 = this;

            document.getElementById('J-update-img').onload = function () {
                var elem = document.getElementById('J-update-img');
                // 获取图片真实宽高，用于后期比例计算
                imgInfo.width = elem.naturalWidth;
                imgInfo.height = elem.naturalHeight;
                userImg.attr('src', src).show();
                cropperIng = true;
                cropperTarget.cropper('destroy');
                cropperTarget.cropper({
                    aspectRatio: 9 / 9,
                    viewMode: 1,
                    // 创建 用户操作都会改变显示对象
                    crop: function crop(e) {
                        _this3.changeImg(e.detail);
                    }
                });
            };
            cropperTarget.attr('src', src).show();
        }
        // 右侧显示对象改变

    }, {
        key: 'changeImg',
        value: function changeImg(detail) {
            var num = 180 / detail.width;
            userImg.css({
                transform: 'translate(-' + detail.x * num + 'px, -' + detail.y * num + 'px) rotate(' + imgInfo.rotate + 'deg)',
                width: imgInfo.width * num + 'px',
                height: imgInfo.heigh * num + 'px'
            });
        }
        // 操作方法

    }, {
        key: 'operation',
        value: function operation(target) {
            if (!cropperIng) {
                return;
            }
            var type = target.data('type');
            switch (type) {
                case 'rote-left':
                    imgInfo.rotate -= 90;
                    $('#J-update-img').cropper('rotate', -90);
                    break;
                case 'rote-right':
                    imgInfo.rotate += 90;
                    $('#J-update-img').cropper('rotate', 90);
                    break;
                case 'scale-b':
                    $('#J-update-img').cropper('zoom', 0.1);
                    break;
                case 'scale-s':
                    $('#J-update-img').cropper('zoom', -0.1);
                    break;
            }
        }
        // 转换成base64输出

    }, {
        key: 'getCroppedCanvas',
        value: function getCroppedCanvas() {
            if (!cropperIng) {
                return;
            }
            var cas = cropperTarget.cropper('getCroppedCanvas');
            var base64 = cas.toDataURL('image/jpeg');
            this.callBack(base64);
            this.destroy();
        }
    }]);

    return UpdateCropper;
}();