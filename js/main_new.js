var alfa = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h'
};
var board = {
    init: function(options) {

        var defaults = {
            sizeX: 600,
            sizeY: 600,
            type: 'chess', // we have only one type at first.
            container: '.container'
        };

        var config = $.extend({}, defaults, options || {});

        $(config.container).append(board_types.chess());

        var figures = {};
        figures[1] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'a'}});
        figures[2] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'b'}});
        figures[3] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'c'}});
        figures[4] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'d'}});
        figures[5] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'e'}});
        figures[6] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'f'}});
        figures[7] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'g'}});
        figures[8] = new figure({type: 'warrior', side: 'white', coords: {x:2, y:'h'}});

        figures[9] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'a'}});
        figures[10] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'b'}});
        figures[11] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'c'}});
        figures[12] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'d'}});
        figures[13] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'e'}});
        figures[14] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'f'}});
        figures[15] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'g'}});
        figures[16] = new figure({type: 'warrior', side: 'black', coords: {x:7, y:'h'}});

        figures[17] = new figure({type: 'horse', side: 'white', coords: {x:1, y:'b'}});

        var len = Object.keys(figures).length;
        for(var i=1; i<=len; i++) {
            figures[i].init();
        }

    }
};


var board_types = {
    chess: function () {
        var table_start = '<table class="desck" id="chessDesck">';
        var table_end = '</table>';
        var tr_empty = '<tr><td class="empty"></td><td class="title">a</td><td class="title">b</td><td class="title">c</td><td class="title">d</td><td class="title">e</td><td class="title">f</td><td class="title">g</td><td class="title">h</td><td class="empty"></td></tr>';
        var tr = '';

        for(var i=1; i<=8; i++) {
            var fields = {
                even: '',
                odd: ''
            };
            for(var f=1; f<=8; f++) {
                if(f%2) {
                    fields.even += '<td class="field dark" data-row="'+i+'" data-col="'+alfa[f]+'" id="' + alfa[f] + i + '">';
                    fields.odd += '<td class="field white" data-row="'+i+'" data-col="'+alfa[f]+'" id="' + alfa[f] + i + '">';
                } else {
                    fields.even += '<td class="field white" data-row="'+i+'" data-col="'+alfa[f]+'" id="' + alfa[f] + i + '">';
                    fields.odd += '<td class="field dark" data-row="'+i+'" data-col="'+alfa[f]+'" id="' + alfa[f] + i + '">';
                }
            }
            var td_number = '<td class="title">'+i+'</td>';
            tr += '<tr class="row_' + i + '">'+td_number+((i%2)?fields.even:fields.odd)+td_number+'</tr>';
        }

        return table_start+tr_empty+tr+tr_empty+table_end;
    }
};

var figure = function(options) {
    return {
        init: function () {
            var f_block = '<div class="figure ' + options.type + '" id="figure_'+options.coords.y+options.coords.x+'">';
            var field = $('#'+options.coords.y+options.coords.x);

            field.append(f_block);
            this.move($('#figure_'+options.coords.y+options.coords.x), field);
        },
        move: function(figure, field){
            var self = this;
            figure.click(function (e) {
                self.avialableMoves();
            });
        },
        avialableMoves: function(){
            var avialable_fields = {};
            this.clearHighlight();
            switch (options.type) {
                case 'warrior':
                    avialable_fields = this.warriorsMoves();
                    break;
                case 'ferz':
                    break;
                case 'horse':
                    //avialable_fields = this.horseMoves();
                    console.log(this.horseMoves());
                    break;
                case 'elephant':
                    break;
                case 'king':
                    break;
                case 'quin':
                    break;
            }
            $.each(avialable_fields, function (index, value) {
                console.log('value: ', value);
                $('#'+value).attr('style', 'background-color: rgba(255, 235, 130, 0.50)');
            });
        },
        clearHighlight: function () {
            $('td').each(function(){
                $(this).removeAttr('style');
            });
        },
        warriorsMoves: function(){
            var result = {};
            switch (options.side) {
                case 'white':
                    var move_length = 1;
                    if(options.coords.x == 2) {
                        move_length = 2;
                    }

                    for(var i=1; i<=move_length; i++) {
                        result[i] = options.coords.y + (options.coords.x + i);
                    }
                    return result;
                    break;
                case 'black':
                    var move_length = 1;
                    if(options.coords.x == 7) {
                        move_length = 2;
                    }

                    for(var i=1; i<=move_length; i++) {
                        result[i] = options.coords.y + (options.coords.x - i);
                    }
                    return result;
                    break;
            }
        },
        horseMoves: function() {
            switch (options.side) {
                case 'white':
                    var y = '';
                    var x = options.coords.x;
                    $.each(alfa, function (index, value) {
                        if(value == options.coords.y) {
                            y = index;
                        }
                    });
                    result = {
                        1: (x-2)+(alfa[y-1]),
                        2: (x-2)+(alfa[y+1]),
                        3: (x-1)+(alfa[y-2]),
                        4: (x-1)+(alfa[y+2]),
                        5: (x+1)+(alfa[y-2]),
                        6: (x+1)+(alfa[y+2]),
                        7: (x+2)+(alfa[y-1]),
                        8: (x+2)+(alfa[y+1])
                    }
                    return result;
                    break;
                case 'black':

                    return result;
                    break;
            }
        }
    };
}
