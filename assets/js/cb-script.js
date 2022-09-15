var $searchForm = $('#searchForm'),
    $postSearch = $('#postSearch'),
    isClearClicked = false;

// Stop dropdown from opening when removing individual options
$("select").on('select2:opening', function(e) {
    if (window['isClearClicked']) {
        e.preventDefault();
        window['isClearClicked'] = false;
    }
}).on('select2:unselect', function(e) {
    window['isClearClicked'] = true;
});

// Submits the form and gets results
$searchForm.on("submit", function(event) {
    console.log($(this).serialize());
    event.preventDefault();
    if ( $(this).serialize() != "postTitle=") {
        $("#cb-results").load("/bc-widgets/complex-blogpost-search/cb-query.html?" + $(this).serialize() + " #cb-results");
    }
});

// Submits the form when clicking on the search result item name and clears the rest
$postSearch.on("select2:selecting", function(e) {
    clearFields();
    $postSearch.on("select2:select", function(e) {
        $searchForm.submit();
    });
});

// Visual hack to have the dropdown look like a simple dropdown and not a search box
$postSearch.on("select2:open", function(e) {
    var searchBoxHeight = $(this).next().height() - 1;
    $(".select2-dropdown").css("top", "-" + searchBoxHeight + "px");
});

// Enable select2 for all selects on the page.
$('select').select2({
    allowClear: true,
});

// Get results with ajax
$postSearch.select2({
    ajax: {
        url: "/bc-widgets/complex-blogpost-search/cb-live.html",
        dataType: 'html',
        processResults: function(data) {
            return {
                results: HTMLtoDOM(data)
            }
        },
        delay: 250,
        cache: true
    },
    allowClear: true,
    placeholder: "Search",
    escapeMarkup: function(markup) {
        return markup;
    },
    minimumInputLength: 3,
    templateResult: formatResults,
    templateSelection: function(item) {
        return item.text;
    }
});

/**
 * It parses the HTML reponse, pushes items into titles[] and returns it to select2
 * The minimum needed data for each object is "id" and "text", but you can add here 
 * anything that module_data has, to make richer results. 
 *
 * @link    https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM
 * @param {string} data HTML AJAX reponse
 * @return {array}      Holds items of the search
 */

function HTMLtoDOM(data) {

    var json, titles = [],
        doc = document.implementation.createHTMLDocument("HTMLReponse");
    doc.documentElement.innerHTML = data;
    json = JSON.parse(doc.body.innerHTML);

    $.map(json.items, function(item) {
        titles.push({
            id: item.id,
            text: item.postTitle
        });
    });

    return titles;
}

/**
 * It returns custom markup of the results. In case loading is still in progress
 * only the text is returned.
 * 
 * @param  {object} item A post item
 * @return {string}      HTML markup
 */
function formatResults(item) {

    if (item.loading) return item.text;

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + item.text + "</div>" +
        "</div></div>";

    return markup;
}

function clearFields() {
    $("input[name='postTitle']").val("");
    $("#tags").select2("val", "");
    $("#categories").select2("val", "");
}
