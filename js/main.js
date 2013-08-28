var $fields_coords = {};
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
        $fields_coords[$alfa[i]+k] = {
            x: 43+35*(i-1), y: 43+35*(k-1)
        };
        $coord_map[i][k] = $alfa[i]+k;
    }
}
//console.log('$fields_coords: ', $fields_coords);

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

                if($mouseX > $stage && $mouseY > $stage && $mouseX < $stage*8+16 && $mouseY < $stage*8+16) {
                    field = $coord_map[Math.round(($mouseX-10) / $stage)][Math.round(($mouseY-10) / $stage)];
                
//                    $('#mouseX').val(Math.round(($mouseX-10) / $stage));
//                    $('#mouseY').val(Math.round(($mouseY-10) / $stage));
                    $('#FIELD').val(field);
                    $board.$currentFigure.css({
                        'left': $e.clientX - 10 - $board_ofset.left,
                        'top': $e.clientY - 10 - $board_ofset.top,
                        'z-index': 10
                    });
                }
            }
        });

        $figures.on("mousedown", function() {
            $board.$currentFigure = $(this);
        });

        $board.on("mouseup", function($e) {
            if ($board.$currentFigure) {
                $board.$currentFigure.css({
                    'left': $fields_coords[field].x,
                    'top': $fields_coords[field].y,
                    'z-index': 1
                });
            }
            
            $board.$currentFigure = null;
        });

    };

    board = new boardClass("#chessDesck");
});