/**
 * Created by hzzhu_zhenyu on 2015/5/22.
 */
(function (w, $, undefined) {

    var _pro, Pager;
    Pager = function (opts) {
        this.init.apply(this, arguments);
    };
    _pro = Pager.prototype;
    Pager.VERSION = '0.1.0';
    Pager.DEFAULTS = {
        curno: 1, //当前页码
        limit: 10,
        show: 5,
        total: 1, //总页码
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
        this.opts = $.extends(Pager.DEFAULTS, opts);
        this.lang = this.opts.lang;
        if (this.opts.totalRecords > this.opts.limit || this.opts.total > 1) {
            this.pager = $('<div class="m-pager"></div>');
            this.pageNoWraper = $('<span class="pages"></span>');
        }
    };

    _pro.__generateHtml = function () {
        this.__createFirstPrevPageBtn();
    };

    _pro.__createFirstPrevPageBtn = function () {
        var _firstPageBtn,_prevPageBtn;
        if (this.opts.isShowFirstPageBtn) {
            _firstPageBtn = $('<a>').text(this.lang.firstPageText)
                .attr({
                    title: this.lang.firstPageTipText
                });
            if(this.cur == 1) {
                _firstPageBtn.addClass('disabled');
            }
            this.pageNoWraper.append(_firstPageBtn);
        }
        _prevPageBtn = $('<a>').text(this.lang)
    };





    $.fn.pager = function () {


        return this.each(function () {

        });
    };

})(window, jQuery, void 0);