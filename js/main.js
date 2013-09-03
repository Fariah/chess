var boardClass = function() {

    var mouse_const = 10;
    var $fields_coords = {},
        $coord_map= {},
        $field= null,
        $board= null,
        $stage= null,
        $currentFigure= null,
        $figures= null,
        $fields= null,
        $board_ofset= null,
        figure_types= {},
        $alfa = {}
    ;

    // Функция доступная только внутри класса.
    function figure_move($mouse, $figure) {
        console.log('$mouse: ', $mouse);
        console.log('$figure: ', $figure);
        console.log('$field: ', $field);
        $figure.css({
            'left': $fields_coords[$field].x,
            'top': $fields_coords[$field].y,
            'z-index': 1
        });
//            return true;
    }

    function mouse_move($e) {

        var $mouseX = Math.floor($e.clientX - mouse_const -  $board_ofset.left);
        var $mouseY = Math.floor($e.clientY - mouse_const - $board_ofset.top);

        if ($mouseX > $stage && $mouseY > $stage && $mouseX < $stage * 8 + 16 && $mouseY < $stage * 8 + 16) {
            $field = $coord_map[Math.round(($mouseX - mouse_const) / $stage)][Math.round(($mouseY - mouse_const) / $stage)];

            $('#FIELD').val($field);
            $board.$currentFigure.css({
                'left': $e.clientX - mouse_const - $board_ofset.left,
                'top': $e.clientY - mouse_const - $board_ofset.top,
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
            figure_types= {
                warior: {
                    first_step: 2,
                    step: 1,
                    direction: 'F',
                    strike: 'angle',
                    move_back: false
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
                        x: 43 + 35 * (i - 1), y: 43 + 35 * (k - 1)
                    };
                    $coord_map[i][k] = $alfa[i] + k;
                }
            }

            $board.on("mousemove", function($e) {
                if ($board.$currentFigure) {
                    mouse_move($e);
                }
            });

            $figures.on("mousedown", function() {
                $board.$currentFigure = $(this);
            });

            $board.on("mouseup", function($e) {
                if ($board.$currentFigure && $field) {
                    figure_move($e, $board.$currentFigure);
                }

                $board.$currentFigure = null;
            });
        },
//        move: function(figure) {
//
//        }
    }

};