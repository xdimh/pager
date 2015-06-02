/**
 * Created by hzzhu_zhenyu on 2015/5/22.
 */
(function (w, $, undefined) {

    var _pro, Pager;
    Pager = function (opts) {
        this.__init.apply(this, arguments);
    };
    _pro = Pager.prototype;
    Pager.VERSION = '0.1.0';
    Pager.DEFAULTS = {
        curno: 4, //当前页码
        limit: 10,
        show: 5,
        total: 122, //总页码
        totalRecords: 0, //总数据条数
        isShowFirstPageBtn: true, //是否显示首页按钮
        isShowLastPageBtn: true, //是否显示尾页按钮
        isShowTotalPage: true, //是否显示总页数
        isShowCurPageNo: true,//是否显示当前页
        isShowTotalRecords: true, //是否显示总记录数
        isGoPage: true,	//是否显示页码跳转输入框
        onchange : function(){},
        lang: {
            firstPageText: '首页',
            firstPageTipText: '首页',
            lastPageText: '尾页',
            lastPageTipText: '尾页',
            prePageText: '上一页',
            prePageTipText: '上一页',
            nextPageText: '下一页',
            nextPageTipText: '下一页',
            totalPageBeforeText: '共',
            totalPageAfterText: '页',
            currPageBeforeText: '当前第',
            currPageAfterText: '页',
            totalInfoSplitStr: '/',
            totalRecordsBeforeText: '共',
            totalRecordsAfterText: '页',
            gopageBeforeText: '&nbsp;转到',
            gopageButtonOkText: '确定',
            gopageAfterText: '页'
        }
    };

    _pro.__init = function (opts) {
        this.opts = $.extend({},Pager.DEFAULTS, opts);
        this.lang = this.opts.lang;
        this.count = Math.floor(this.opts.show / 2);
        this.opts.total = this.opts.total || this.opts.totalRecords && Math.ceil(this.opts.totalRecords / this.opts.limit);
        if (this.opts.totalRecords > this.opts.limit || this.opts.total > 1) {
            this.pager = $('<div class="m-pager"></div>');
            this.pageNoWraper = $('<span class="pages"></span>');
            if (this.opts.isShowTotalPage || this.opts.isGoPage) {
                this.moreWraper = $('<span class="more"></span>');
            }
            this.__generateHtml();
            this.__bindEvent();
        }
    };

    _pro.__generateHtml = function () {
        this.__createFirstPrevPageBtn();
        this.__createPageNoBtn();
        this.__createLastNextPageBtn();
        this.__createTotalInfo();
        this.__createGoBtn();
        this.pager.append(this.pageNoWraper);
        this.pager.append(this.moreWraper);
    };

    _pro.__createFirstPrevPageBtn = function () {
        var _firstPageBtn, _prevPageBtn;
        _prevPageBtn = $('<a>').text(this.lang.prePageText)
            .attr({
                href: 'javascript:void(0);',
                title: this.lang.prePageTipText,
                "data-action": "prev"
            }).addClass('prev');
        if (this.opts.isShowFirstPageBtn) {
            _firstPageBtn = $('<a>').text(this.lang.firstPageText)
                .attr({
                    href: 'javascript:void(0);',
                    title: this.lang.firstPageTipText,
                    "data-action": 'first'
                }).addClass('first');
        }
        if (this.opts.curno == 1) {
            _prevPageBtn.addClass('disabled');
            _firstPageBtn && _firstPageBtn.addClass('disabled');
        }
        _firstPageBtn && this.pageNoWraper.append(_firstPageBtn);
        this.pageNoWraper.append(_prevPageBtn);
    };

    _pro.__createPageNoBtn = function () {
        var _begin, _end, _pageNoBtn,
            _opts = this.opts, _begin, _end;
        if (_opts.total < (this.count * 2 + 3)) {
            for (var i = 1; i <= _opts.total; i++) {
                _pageNoBtn = $('<a>').text(i).attr({
                    href: 'javascript:void(0);',
                    title: '第' + i + '页',
                    "data-pageno": i,
                    "data-action": "pageno"
                }).addClass('pageno');
                if (i == _opts.curno) {
                    _pageNoBtn.addClass('active');
                }
                this.pageNoWraper.append(_pageNoBtn);
            }
        } else {
            _begin = _opts.curno - this.count;
            _end = _opts.curno + this.count;
            if (_begin < 1) {
                _end += (1 - _begin);
                _begin = 1;
            }
            if (_end > _opts.total) {
                _begin = _begin - _end + _opts.total;
                _end = _opts.total;
            }
            if (_begin > 2) {
                this.pageNoWraper.append('<a class="pageno" data-action="pageno" data-pageno="1" href="javascript:void(0);" title="第1页">1</a>');
                this.pageNoWraper.append('<span class="prevdots">...</span>');
            } else if (_begin == 2) {
                this.pageNoWraper.append('<a class="pageno" data-action="pageno" data-pageno="1" href="javascript:void(0);" title="第1页">1</a>');
            }
            for (var i = _begin; i <= _end; i++) {
                _pageNoBtn = $('<a>').text(i).attr({
                    href: 'javascript:void(0);',
                    title: '第' + i + '页',
                    "data-pageno": i,
                    "data-action": "pageno"
                }).addClass('pageno');
                if (i == _opts.curno)
                    _pageNoBtn.addClass('active');
                this.pageNoWraper.append(_pageNoBtn);
            }
            if (_end < _opts.total - 1) {
                this.pageNoWraper.append('<span class="nextdots">...</span>');
                this.pageNoWraper.append('<a class="pageno" href="javascript:void(0);" title="第' + _opts.total + '页" data-action="pageno" data-pageno="' + _opts.total + '">' + _opts.total + '</a>');
            } else if (_end == _opts.total - 1) {
                this.pageNoWraper.append('<a class="pageno" href="javascript:void(0);" title="第' + _opts.total + '页" data-action="pageno" data-pageno="' + _opts.total + '">' + _opts.total + '</a>');
            }
        }
    };

    _pro.__createLastNextPageBtn = function () {
        var _lastPageBtn, _nextPageBtn;
        _nextPageBtn = $('<a>').text(this.lang.nextPageText)
            .attr({
                href: 'javascript:void(0);',
                title: this.lang.nextPageTipText,
                'data-action': 'next',
            }).addClass('next');
        if (this.opts.isShowLastPageBtn) {
            _lastPageBtn = $('<a>').text(this.lang.lastPageText)
                .attr({
                    href: 'javascript:void(0);',
                    title: this.lang.lastPageTipText,
                    "data-action": "last"
                }).addClass('last');
        }
        if (this.opts.curno == this.opts.total) {
            _nextPageBtn.addClass('disabled');
            _lastPageBtn && _lastPageBtn.addClass('disabled');
        }
        this.pageNoWraper.append(_nextPageBtn);
        _lastPageBtn && this.pageNoWraper.append(_lastPageBtn);
    };


    _pro.__createTotalInfo = function () {
        var _opts = this.opts,
            _$totalWraper = $('<span class="total"></span>'),
            _totalInfoStr;

        if (_opts.isShowTotalPage) {
            _totalInfoStr = '<span>'
            + _opts.lang.currPageBeforeText
            + '<strong id="J-curr">'
            + _opts.curno + '</strong>'
            + _opts.lang.currPageAfterText
            + '</span><span>'
            + _opts.lang.totalInfoSplitStr
            + '</span><span>'
            + _opts.lang.totalRecordsBeforeText
            + _opts.total
            + _opts.lang.totalRecordsAfterText
            + '</sapn>';
            _$totalWraper.append(_totalInfoStr);
            this.moreWraper.append(_$totalWraper);
        }
    }

    _pro.__createGoBtn = function () {
        var _opts = this.opts,
            _$gobtnWraper = $('<span class="gobtn"></span>'),
            _gobtnStr;
        if (_opts.isGoPage) {
            _gobtnStr = _opts.lang.gopageBeforeText
            + '<input id="J-pagenoipt" class="pagenoipt" type="text" value="'
            + _opts.curno
            + '">'
            + _opts.lang.gopageAfterText
            + '<button id="J-gobtn" class="gobtn" type="button">'
            + _opts.lang.gopageButtonOkText
            + '</button>';
            _$gobtnWraper.append(_gobtnStr);
            this.moreWraper.append(_$gobtnWraper);
        }
    };

    _pro.__onPageBtnClick = function (_event) {
        var _$target = $(_event.target),
            _action = _$target.data('action');
        if (!_$target.hasClass('active') && !_$target.hasClass('disabled') && !_$target.hasClass('prevdots') && !_$target.hasClass('nextdots')) {
            switch (_action) {
                case "prev" :
                    this.opts.curno -= 1;
                    break;
                case "next" :
                    this.opts.curno += 1;
                    break;
                case "first" :
                    this.opts.curno = 1;
                    break;
                case "last" :
                    this.opts.curno = this.opts.total;
                    break;
                case "pageno" :
                    this.opts.curno = +_$target[0].getAttribute('data-pageno');
                    break;
                default :
                    break;
            }
            this.__updatePageNo();
            this.opts.onchange({
                limit: this.opts.limit,
                index: this.opts.curno
            });
        }
    };

    _pro.__onGoBtnClick = function (_event) {
        var _goNo = +$('#J-pagenoipt', this.moreWraper).val();
        if (_goNo != this.opts.curno) {
            this.opts.curno = +$('#J-pagenoipt', this.moreWraper).val();
            this.__updatePageNo();
            this.opts.onchange({
                limit: this.opts.limit,
                index: this.opts.curno
            });
        }
    };

    _pro.__onPageNoIptKeyDown = function(_event) {
        if(_event.which == 13) {
            this.__onGoBtnClick();
        }
    };

    _pro.__bindEvent = function () {
        this.pageNoWraper.on('click', 'a', $.proxy(this.__onPageBtnClick, this));
        $('#J-gobtn', this.moreWraper).bind('click', $.proxy(this.__onGoBtnClick, this));
        $('#J-pagenoipt',this.moreWraper).bind('keydown',$.proxy(this.__onPageNoIptKeyDown, this));
    };

    _pro.__updatePageNo = function () {
        var _opts = this.opts,
            _len = $('.pageno', this.pageNoWraper).length,
            _pageNos = $('.pageno', this.pageNoWraper).filter(function (index) {
                return index != 0 && _len - 1 != index;
            }),
            _isShowPrevDot = false,
            _isShowNextDot = false,
            _lastSet;
        if(_opts.ref && _opts.ref instanceof Pager) {
            _opts.ref._$goPageNo.call(_opts.ref,_opts.curno);
        }
        $('#J-curr', this.moreWraper).text(_opts.curno);
        $('#J-pagenoipt', this.moreWraper).val(_opts.curno);
        if (_opts.curno <= 1) {
            _opts.curno = 1;
            $('.first,.prev',this.pageNoWraper).addClass('disabled');
        } else {
            $('.first,.prev',this.pageNoWraper).removeClass('disabled');
        }
        if (_opts.curno >= _opts.total) {
            _opts.curno = _opts.total;
            $('.last,.next',this.pageNoWraper).addClass('disabled');
        } else {
            $('.last,.next',this.pageNoWraper).removeClass('disabled');
        }

        if (_opts.total < (this.count * 2 + 3)) {
            $('.pageno', this.pageNoWraper).removeClass('active');
            $('[data-pageno="' + _opts.curno + '"]',this.pageNoWraper).addClass('active');
        } else {
            _begin = _opts.curno - this.count;
            _end = _opts.curno + this.count;
            if (_begin < 1) {
                _end += (1 - _begin);
                _begin = 1;
            }
            if (_end > _opts.total) {
                _begin = _begin - _end + _opts.total;
                _end = _opts.total;
            }
            if (_begin > 2) {
                _isShowPrevDot = true;
            } else if (_begin == 1) {
                _begin = 2;
            }
            if (_end < _opts.total - 1) {
                _isShowNextDot = true;
            } else if (_end == _opts.total) {
                _end = _opts.total - 1;
            }

            if (_isShowPrevDot && $('.prevdots', this.pageNoWraper).size() == 0) {
                $('.prev', this.pageNoWraper).next().after('<span class="prevdots">...</span>');
            } else if (!_isShowPrevDot && $('.prevdots', this.pageNoWraper).size()) {
                $('.prevdots', this.pageNoWraper).remove();
            }

            if (_isShowNextDot && $('.nextdots', this.pageNoWraper).size() == 0) {
                $('.next', this.pageNoWraper).prev().before('<span class="nextdots">...</span>');
            } else if (!_isShowNextDot && $('.nextdots', this.pageNoWraper).size()) {
                $('.nextdots', this.pageNoWraper).remove();
            }


            if (_pageNos.length > (_end - _begin + 1)) {
                _pageNos.last().remove();
                _lastSet = _pageNos.filter(function (index) {
                    return index != _pageNos.length - 1;
                });
            } else if (_pageNos.length < (_end - _begin + 1)) {
                var _newPage = $('<a class="pageno"></a>');
                _pageNos.last().after(_newPage);
                _lastSet = _pageNos.add(_newPage);
            } else {
                _lastSet = _pageNos;
            }
            $('.pageno', this.pageNoWraper).removeClass('active');
            if (_opts.curno == 1) {
                $('.prev', this.pageNoWraper).next().addClass('active');
            } else if (_opts.curno == _opts.total) {
                $('.next', this.pageNoWraper).prev().addClass('active');
            }
            for (var i = 0; i < _lastSet.length; i++) {
                var _pageno = _begin + i;
                _lastSet.eq(i).text(_pageno).attr({
                    "data-action": 'pageno',
                    "data-pageno": _pageno,
                    "title": '第' + _pageno + '页',
                    "href": 'javascript:void(0);'
                }).addClass('pageno');
                if (_pageno == _opts.curno) {
                    _lastSet.eq(i).addClass('active');
                }
            }
        }
    };

    _pro._$goPageNo = function(n) {
        if(n != this.opts.curno) {
            this.opts.curno = n;
            this.__updatePageNo();
            this.opts.onchange({
                limit: this.opts.limit,
                index : n
            })
        }
    };

    _pro._$addOpt = function(_name,_value) {
        this.opts[_name] = _value;
    };

    _pro._$getPager = function() {
      return this.pager;
    };

    $.fn.pager = function (_opts) {
        return this.each(function(){
           var $this = $(this),
               _pager = $this.data('xdimh.pager');
           if(!_pager) {
               $this.data('xdimh.pager',(_pager = new Pager(_opts)));
           }
           if(_opts && _opts.ref && _opts.ref instanceof Pager) {
               _opts.ref._$addOpt('ref',_pager);
           }
           $this.append(_pager._$getPager());
        });
    };

})(window, jQuery, void 0);