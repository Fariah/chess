//var figures = {
//    Ferz_a1: {x: 43, y: 42},
//    Horse_b1: {x: 78, y: 42},
//    Oficer_c1: {x: 113, y: 42},
//    King_d1: {x: 148, y: 42},
//    Quin_e1: {x: 183, y: 42},
//    Oficer_f1: {x: 218, y: 42},
//    Horse_g1: {x: 253, y: 42},
//    Ferz_h1: {x: 288, y: 42},
//    Warior_a2: {x: 43, y: 78},
//    Warior_b2: {x: 78, y: 78},
//    Warior_c2: {x: 113, y: 78},
//    Warior_d2: {x: 148, y: 78},
//    Warior_e2: {x: 183, y: 78},
//    Warior_f2: {x: 218, y: 78},
//    Warior_g2: {x: 253, y: 78},
//    Warior_h2: {x: 288, y: 78},
//    Warior_a7: {x: 43, y: 253},
//    Warior_b7: {x: 78, y: 253},
//    Warior_c7: {x: 113, y: 253},
//    Warior_d7: {x: 148, y: 253},
//    Warior_e7: {x: 183, y: 253},
//    Warior_f7: {x: 218, y: 253},
//    Warior_g7: {x: 253, y: 253},
//    Warior_h7: {x: 288, y: 253},
//    Ferz_a8: {x: 43, y: 288},
//    Horse_b8: {x: 78, y: 288},
//    Oficer_c8: {x: 113, y: 288},
//    King_d8: {x: 148, y: 288},
//    Quin_e8: {x: 183, y: 288},
//    Oficer_f8: {x: 218, y: 288},
//    Horse_g8: {x: 253, y: 288},
//    Ferz_h8: {x: 288, y: 288}
//};

var $fields_coords = {
    a1: {x: 43, y: 43},
    b1: {x: 78, y: 43},
    c1: {x: 113, y: 43},
    d1: {x: 148, y: 43},
    e1: {x: 183, y: 43},
    f1: {x: 218, y: 43},
    g1: {x: 253, y: 43},
    h1: {x: 288, y: 43},
    a2: {x: 43, y: 78},
    b2: {x: 78, y: 78},
    c2: {x: 113, y: 78},
    d2: {x: 148, y: 78},
    e2: {x: 183, y: 78},
    f2: {x: 218, y: 78},
    g2: {x: 253, y: 78},
    h2: {x: 288, y: 78},
    a3: {x: 43, y: 113},
    b3: {x: 78, y: 113},
    c3: {x: 113, y: 113},
    d3: {x: 148, y: 113},
    e3: {x: 183, y: 113},
    f3: {x: 218, y: 113},
    g3: {x: 253, y: 113},
    h3: {x: 288, y: 113},
    a4: {x: 43, y: 148},
    b4: {x: 78, y: 148},
    c4: {x: 113, y: 148},
    d4: {x: 148, y: 148},
    e4: {x: 183, y: 148},
    f4: {x: 218, y: 148},
    g4: {x: 253, y: 148},
    h4: {x: 288, y: 148},
    a5: {x: 43, y: 183},
    b5: {x: 78, y: 183},
    c5: {x: 113, y: 183},
    d5: {x: 148, y: 183},
    e5: {x: 183, y: 183},
    f5: {x: 218, y: 183},
    g5: {x: 253, y: 183},
    h5: {x: 288, y: 183},
    a6: {x: 43, y: 218},
    b6: {x: 78, y: 218},
    c6: {x: 113, y: 218},
    d6: {x: 148, y: 218},
    e6: {x: 183, y: 218},
    f6: {x: 218, y: 218},
    g6: {x: 253, y: 218},
    h6: {x: 288, y: 218},
    a7: {x: 43, y: 253},
    b7: {x: 78, y: 253},
    c7: {x: 113, y: 253},
    d7: {x: 148, y: 253},
    e7: {x: 183, y: 253},
    f7: {x: 218, y: 253},
    g7: {x: 253, y: 253},
    h7: {x: 288, y: 253},
    a8: {x: 43, y: 288},
    b8: {x: 78, y: 288},
    c8: {x: 113, y: 288},
    d8: {x: 148, y: 288},
    e8: {x: 183, y: 288},
    f8: {x: 218, y: 288},
    g8: {x: 253, y: 288},
    h8: {x: 288, y: 288},
}
var $coord_map = {};
var $alfa = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
};
for(var i=1; i<9; i++) {
    $coord_map[i] = {};
    for(var k=1; k<9; k++) {
        $coord_map[i][k] = $alfa[i]+k;
    }
}
//console.log('$coord_map: ', $coord_map);

$(document).ready(function() {
    var boardClass = function(elem) {
        var $field;
        var $stage = Math.floor((parseInt($(elem).css('width')))/10);

        var $board = $(elem),
                $currentFigure  = null,
                $figures        = $(".figure"),
                $fields         = $('.field'),
                $board_ofset    = $(elem).offset()
                ;

        $board.on("mousemove", function($e) {
            if ($board.$currentFigure) {
                var $mouseX = Math.floor($e.clientX - 10 - $board_ofset.left);
                var $mouseY = Math.floor($e.clientY - 10 - $board_ofset.top);

                if($mouseX > 35 && $mouseY > 35 && $mouseX < 296 && $mouseY < 296) {
                    field = $coord_map[Math.round(($mouseX-10) / $stage)][Math.round(($mouseY-10) / $stage)];
                
//                    $('#mouseX').val(Math.round(($mouseX-10) / $stage));
//                    $('#mouseY').val(Math.round(($mouseY-10) / $stage));
                    $('#FIELD').val(field);
                    $board.$currentFigure.css({
                        'left': $e.clientX - 10 - $board_ofset.left,
                        'top': $e.clientY - 10 - $board_ofset.top
                    });
                }
            }
        });

        $figures.on("mousedown", function() {
            $board.$currentFigure = $(this);
        });

        $board.on("mouseup", function($e) {
            $board.$currentFigure.css({
                'left': $fields_coords[field].x,
                'top': $fields_coords[field].y
            });
            
            $board.$currentFigure = null;
        });

    };

    board = new boardClass("#chessDesck");
});