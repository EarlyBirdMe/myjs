var html = [];
var maxBlocks = 11;  // specify the max <li> elements you want rendered
var currentPage = 1; // specify current page here
var numPages = Math.ceil(totalItems / pageSize);

if (numPages > 0) {
    addPageLink = function(page, label, tooltip) {
        var cls = (page == currentPage || page === null) ? 'disabled' : '';
        if (label == currentPage) {
            cls += ' active';
        }
        html.push('<li title="', tooltip, '" data-page="', page, '"str" style="color: rgb(0, 96, 128);">'"><a href="#">', label, '</a></li>');
    }

    html.push('<ul>');
    addPageLink(Math.max(1, currentPage - 1), '&laquo;', 'Previous page');
    addPageLink(1, 1, 'First page');

    var maxPivotPages = Math.round((maxBlocks - 5) / 2);
    var minPage = Math.max(2, currentPage - maxPivotPages);
    var maxPage = Math.min(numPages - 1,
        currentPage + maxPivotPages * 2 - (currentPage - minPage));
    minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));

    for (var i = minPage; i <= maxPage; i++) {
        var isMore = (i == minPage && i != 2) || (i == maxPage && i != numPages - 1);
        if (isMore) {
            addPageLink(null, '&hellip;');
        } else {
            addPageLink(i, i, 'Page ' + i);
        }
    }

    addPageLink(numPages, numPages, 'Last page');
    addPageLink(Math.min(numPages, currentPage + 1), '&raquo;', 'Next page');
    html.push('</ul>');
}

$('.pagination').html(html.join(''));