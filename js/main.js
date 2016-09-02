
/*
 * Класс пешки, принимает 3 параметра
 * 
 * old_pos - string, координаты стартовой позиции фигуры, например "a2"
 * new_pos - string, координаты конечной позиции фигуры, например "a4" 
 * 
 */
var wariorClass = function(old_pos, new_pos) {

    this.old_pos = old_pos;
    this.new_pos = new_pos;

/*
 *  метод возвращает координаты стандартного хода пешки (пока только 1 вперед)
 */
    this.getStdMove = function () {
        var alfa = this.old_pos[0],
            num = this.old_pos[1];

        console.log('getStdMove: ', [alfa + ( parseInt(num)+1)]);

        return [alfa + ( parseInt(num)+1)];
    };
}
/*
 *  Класс шахматной доски, включает метод инициализации и методы обработки ходов
 */
var boardClass = function() {

    var $mouse_const    = 10;

    var $fields_coords  = {},
        $coord_map      = {},
        $field          = null,
        $board          = null,
        $stage          = null,
        $currentFigure  = null,
        $figures        = null,
        $fields         = null,
        $board_ofset    = null,
        $figure_types   = {},
        $alfa           = {},
        $old_position   = null,
        $old_coords     = {}
    ;

    function check_move($figure, $old, $new) {

        if($figure in $figure_types) {
            var $result = false,
                $obj = new window[$figure_types[$figure]['class']]($old, $new),
                $data = $obj.getStdMove();

            $.each($data, function(index, value) {
                if(value == $new) {
                    $('#HistoryMove').append($figure + ": " + $old + "->" + $new + "<br />");
                    $result = true;
                }
            });
            return $result;
        }
    }

    function figure_move($mouse, $figure) {

        if(check_move($figure.context.classList[1], $old_position, $field) == true) {
            console.log('figure_move: ', $old_coords);
            $figure.css({
                'left': $fields_coords[$field].x,
                'top': $fields_coords[$field].y,
                'z-index': 1
            });
        } else {
            console.log('figure_move else: ', $old_coords);
            $figure.css({
                'left': $old_coords.x,
                'top': $old_coords.y,
                'z-index': 1
            });
        }
    }

    function get_curr_position($e) {
        var $mouseX = Math.floor($e.clientX - $mouse_const -  $board_ofset.left),
            $mouseY = Math.floor($e.clientY - $mouse_const - $board_ofset.top);

        //console.log('get_curr_position: ', $fields_coords);
        if ($mouseX > $stage && $mouseY > $stage && $mouseX < $stage * 8 + 16 && $mouseY < $stage * 8 + 16) {
            $field = $coord_map[Math.round(($mouseX - $mouse_const) / $stage)][Math.round(($mouseY - $mouse_const) / $stage)];
            $old_coords = {
                x: $fields_coords[$field].x,
                y: $fields_coords[$field].y,
            };
            return $field;
        }
        else {
            return false;
        }
    }

    function mouse_move($e) {

        var $mouseX = Math.floor($e.clientX - $mouse_const -  $board_ofset.left),
            $mouseY = Math.floor($e.clientY - $mouse_const - $board_ofset.top);

        //console.log('$e: ', $e);
        //console.log('$mouseX: ', $mouseX);
        //console.log('$mouseY: ', $mouseY);

        if ($mouseX > $stage && $mouseY > $stage && $mouseX < $stage * 8 + 16 && $mouseY < $stage * 8 + 16) {
            $field = $coord_map[Math.round(($mouseX - $mouse_const) / $stage)][Math.round(($mouseY - $mouse_const) / $stage)];
            $board.$currentFigure.css({
                'left': $e.clientX - $mouse_const - $board_ofset.left,
                'top': $e.clientY - $mouse_const - $board_ofset.top,
                'z-index': 10
            });
        }
    }

    return {
        init: function() {

            $board= $('#chessDesck'),
            $stage= Math.floor((parseInt($($board).css('width'))) / 10),
            $figures= $(".figure"),
            $fields= $('.field'),
            $board_ofset= $($board).offset(),
            $figure_types= {
                warior: {
                    class: 'wariorClass'
                }
            },
            $alfa = {
                1: 'a',
                2: 'b',
                3: 'c',
                4: 'd',
                5: 'e',
                6: 'f',
                7: 'g',
                8: 'h',
            };
            for (var i = 1; i < 9; i++) {
                $coord_map[i] = {};
                for (var k = 1; k < 9; k++) {
                    $fields_coords[$alfa[i] + k] = {
                        //x: 43 + 35 * (i - 1),
                        //y: 43 + 35 * (k - 1)
                        x: 0,
                        y: 35 * (k - 2)
                    };
                    $coord_map[i][k] = $alfa[i] + k;
                }
            }

            console.log('$coord_map: ', $coord_map);
            console.log('$fields_coords: ', $fields_coords);

            $board.on("mousemove", function($e) {
                if ($board.$currentFigure) {
                    mouse_move($e);
                }
            });

            $figures.on("mousedown", function($e) {
                $old_position = get_curr_position($e);
                $board.$currentFigure = $(this);
            });

            $board.on("mouseup", function($e) {
                if ($board.$currentFigure && $field) {
                    figure_move($e, $board.$currentFigure);
                }
                $board.$currentFigure = null;
            });
        }
    }

};