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
        curno: 9, //当前页码
        limit: 10,
        show: 7,
        total: 8, //总页码
        totalRecords: 0, //总数据条数
        isShowFirstPageBtn: true, //是否显示首页按钮
        isShowLastPageBtn: true, //是否显示尾页按钮
        isShowTotalPage: true, //是否显示总页数
        isShowCurPageNo: true,//是否显示当前页
        isShowTotalRecords: false, //是否显示总记录数
        isGoPage: false,	//是否显示页码跳转输入框
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
            totalRecordsAfterText: '条数据',
            gopageBeforeText: '&nbsp;转到',
            gopageButtonOkText: '确定',
            gopageAfterText: '页'
        }
    };

    _pro.__init = function (opts) {
        this.opts = $.extend(Pager.DEFAULTS, opts);
        this.lang = this.opts.lang;
        this.count = Math.floor(this.opts.show / 2);
        this.opts.total = this.opts.total || this.opts.totalRecords && Math.ceil(this.opts.totalRecords / this.opts.limit);
        if (this.opts.totalRecords > this.opts.limit || this.opts.total > 1) {
            this.pager = $('<div class="m-pager"></div>');
            this.pageNoWraper = $('<span class="pages"></span>');
            this.__generateHtml();
        }
    };

    _pro.__generateHtml = function () {
        this.__createFirstPrevPageBtn();
        this.__createPageNoBtn();
        this.__createLastNextPageBtn();
        this.pager.append(this.pageNoWraper);
        $('body').append(this.pager);
    };

    _pro.__createFirstPrevPageBtn = function () {
        var _firstPageBtn,_prevPageBtn;
        _prevPageBtn = $('<a>').text(this.lang.prePageText)
            .attr({
                href : 'javascript:void(0);',
                title : this.lang.prePageTipText
            });
        if (this.opts.isShowFirstPageBtn) {
            _firstPageBtn = $('<a>').text(this.lang.firstPageText)
                .attr({
                    href : 'javascript:void(0);',
                    title: this.lang.firstPageTipText
                });
        }
        if(this.opts.curno == 1) {
            _prevPageBtn.addClass('disabled');
            _firstPageBtn && _firstPageBtn.addClass('disabled');
        }
        _firstPageBtn && this.pageNoWraper.append(_firstPageBtn);
        this.pageNoWraper.append(_prevPageBtn);
    };

    _pro.__createPageNoBtn = function() {
        var _begin,_end,_pageNoBtn,
            _opts = this.opts,_begin,_end;
        if(_opts.total < (this.count * 2 + 3)) {
            for(var i = 1; i <= _opts.total; i++) {
                _pageNoBtn = $('<a>').text(i).attr({
                    href : 'javascript:void(0);',
                    title : '第' + i + '页'
                });
                if(i == _opts.curno) {
                    _pageNoBtn.addClass('active');
                }
                this.pageNoWraper.append(_pageNoBtn);
            }
        } else {
            _begin = _opts.curno - this.count;
            _end = _opts.curno + this.count;
            if(_begin < 1) {
                _end += (1 - _begin);
                _begin = 1;
            }
            if(_end > _opts.total) {
                _begin = _begin -_end  + _opts.total;
                _end = _opts.total;
            }
            if(_begin > 2) {
                this.pageNoWraper.append('<a href="javascript:void(0);" title="第一页">1</a>');
                this.pageNoWraper.append('<a href="javascript:void(0);" title="">...</a>');
            } else if(_begin == 2) {
                this.pageNoWraper.append('<a href="javascript:void(0);" title="第一页">1</a>');
            }
            for(var i = _begin;i <= _end; i++) {
                _pageNoBtn = $('<a>').text(i).attr({
                    href : 'javascript:void(0);',
                    title : '第' + i + '页'
                });
                if(i == _opts.curno)
                    _pageNoBtn.addClass('active');
                this.pageNoWraper.append(_pageNoBtn);
            }
            if(_end < _opts.total - 1) {
                this.pageNoWraper.append('<a href="javascript:void(0);" title="">...</a>');
                this.pageNoWraper.append('<a href="javascript:void(0);" title="">' + _opts.total + '</a>');
            } else if(_end == _opts.total - 1) {
                this.pageNoWraper.append('<a href="javascript:void(0);" title="">' + _opts.total + '</a>');
            }
        }
    };

    _pro.__createLastNextPageBtn = function() {
        var _lastPageBtn,_nextPageBtn;
        _nextPageBtn = $('<a>').text(this.lang.nextPageText)
            .attr({
                href : 'javascript:void(0);',
                title : this.lang.nextPageTipText
            });
        if (this.opts.isShowLastPageBtn) {
            _lastPageBtn = $('<a>').text(this.lang.lastPageText)
                .attr({
                    href : 'javascript:void(0);',
                    title: this.lang.lastPageTipText
                });
        }
        if(this.opts.curno == this.opts.total) {
            _nextPageBtn.addClass('disabled');
            _lastPageBtn && _lastPageBtn.addClass('disabled');
        }
        _lastPageBtn && this.pageNoWraper.append(_lastPageBtn);
        this.pageNoWraper.append(_nextPageBtn);
    };

    $.fn.pager = function () {
        new Pager();
        //return $(this).each(function() {
        //    alert();
        //    new Pager();
        //});
    };

})(window, jQuery, void 0);