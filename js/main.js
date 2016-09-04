var alfa = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h'
}, figures = {}, active = 'white';

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

        figures = {
            "2a": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'a'}}),
            "2b": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'b'}}),
            "2c": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'c'}}),
            "2d": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'d'}}),
            "2e": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'e'}}),
            "2f": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'f'}}),
            "2g": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'g'}}),
            "2h": new figure({type: 'warrior', side: 'white', coords: {x:2, y:'h'}}),
            "1a": new figure({type: 'ferz', side: 'white', coords: {x:1, y:'a'}}),
            "1b": new figure({type: 'horse', side: 'white', coords: {x:1, y:'b'}}),
            "1c": new figure({type: 'elephant', side: 'white', coords: {x:1, y:'c'}}),
            "1d": new figure({type: 'quin', side: 'white', coords: {x:1, y:'d'}}),
            "1e": new figure({type: 'king', side: 'white', coords: {x:1, y:'e'}}),
            "1f": new figure({type: 'elephant', side: 'white', coords: {x:1, y:'f'}}),
            "1g": new figure({type: 'horse', side: 'white', coords: {x:1, y:'g'}}),
            "1h": new figure({type: 'ferz', side: 'white', coords: {x:1, y:'h'}}),
            "7a": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'a'}}),
            "7b": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'b'}}),
            "7c": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'c'}}),
            "7d": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'d'}}),
            "7e": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'e'}}),
            "7f": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'f'}}),
            "7g": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'g'}}),
            "7h": new figure({type: 'warrior', side: 'black', coords: {x:7, y:'h'}}),
            "8a": new figure({type: 'ferz', side: 'black', coords: {x:8, y:'a'}}),
            "8b": new figure({type: 'horse', side: 'black', coords: {x:8, y:'b'}}),
            "8c": new figure({type: 'elephant', side: 'black', coords: {x:8, y:'c'}}),
            "8d": new figure({type: 'quin', side: 'black', coords: {x:8, y:'d'}}),
            "8e": new figure({type: 'king', side: 'black', coords: {x:8, y:'e'}}),
            "8f": new figure({type: 'elephant', side: 'black', coords: {x:8, y:'f'}}),
            "8g": new figure({type: 'horse', side: 'black', coords: {x:8, y:'g'}}),
            "8h": new figure({type: 'ferz', side: 'black', coords: {x:8, y:'h'}}),
        };

        $.each(figures, function (index, value) {
            value.init(index);
        });

    },
    update: function() {
        $('.figure').remove();
        $.each(figures, function (index, value) {
            value.init(index);
        });
    }
};


var board_types = {
    chess: function () {
        var table_start = '<table class="desck" id="chessDesck">';
        var table_end = '</table>';
        var tr_empty = '<tr><td class="empty"></td><td class="title">a</td><td class="title">b</td><td class="title">c</td><td class="title">d</td><td class="title">e</td><td class="title">f</td><td class="title">g</td><td class="title">h</td><td class="empty"></td></tr>';
        var tr = '';

        for(var i=8; i>=1; i--) {
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

var figure = function(data) {
    return {
        options: data,
        init: function (index) {
            var f_block = '<div class="figure ' + this.options.type + ' ' + this.options.side + '" id="figure_'+this.options.coords.y+this.options.coords.x+'"></div>'; // create figure
            var field = $('#'+this.options.coords.y+this.options.coords.x); // get field for figure
            field.append(f_block);
            this.move($('#figure_'+this.options.coords.y+this.options.coords.x), index);
        },
        move: function(figure, index){
            var self = this;
            if(active == this.options.side) {
                figure.click(function (e) {
                    var fields = self.avialableMoves();
                    $.each(fields, function (i, value) {
                        $('#'+value).click(function(){
                            var x = $(this).attr('data-row');
                            var y = $(this).attr('data-col');
                            figures[index].options.coords.x = x;
                            figures[index].options.coords.y = y;
                            self.clearHighlight();
                            $('#'+value).unbind();
                            self.changeActive(self.options.side);
                            board.update();
                        });
                    });
                });
            }
        },
        avialableMoves: function(){
            var avialable_fields = {};
            this.clearHighlight();
            switch (this.options.type) {
                case 'warrior':
                    avialable_fields = this.warriorsMoves();
                    break;
                case 'ferz':
                    avialable_fields = this.ferzMoves();
                    break;
                case 'horse':
                    avialable_fields = this.horseMoves();
                    break;
                case 'elephant':
                    break;
                case 'king':
                    break;
                case 'quin':
                    break;
            }
            $.each(avialable_fields, function (index, value) {
                $('#'+value).attr('style', 'background-color: rgba(255, 235, 130, 0.50)');
            });
            return avialable_fields;
        },
        clearHighlight: function () {
            $('td').each(function(){
                $(this).removeAttr('style');
            });
        },
        changeActive: function (current) {
            if(current == 'white') {
                active = 'black';
            } else {
                active = 'white';
            }
        },
        warriorsMoves: function(){
            var result = {};
            switch (this.options.side) {
                case 'white':
                    var move_length = 1;
                    if(this.options.coords.x == 2) {
                        move_length = 2;
                    }

                    for(var i=1; i<=move_length; i++) {
                        result[i] = this.options.coords.y + (parseInt(this.options.coords.x*1) + i);
                    }
                    return result;
                    break;
                case 'black':
                    var move_length = 1;
                    if(this.options.coords.x == 7) {
                        move_length = 2;
                    }

                    for(var i=1; i<=move_length; i++) {
                        result[i] = this.options.coords.y + (this.options.coords.x - i);
                    }
                    return result;
                    break;
            }
        },
        horseMoves: function() {
            var result = {}, self = this;
            switch (this.options.side) {
                case 'white':
                    var y = '';
                    var x = this.options.coords.x;
                    $.each(alfa, function (index, value) {
                        if(value == self.options.coords.y) {
                            y = index;
                        }
                    });

                    if(((x-2)>0) && y*1-1>0){
                        result[1] = (alfa[y*1-1])+(x-2);
                    }
                    if(((x-2)>0) && y*1+1<9){
                        result[2] = (alfa[y*1+1])+(x-2);
                    }
                    if(((x-1)>0) && y*1-2>0){
                        result[3] = (alfa[y*1-2])+(x-1);
                    }
                    if(((x-1)>0) && y*1+2<9){
                        result[4] = (alfa[y*1+2])+(x-1);
                    }


                    if(((x+1)<9) && y*1-2>0){
                        result[5] = (alfa[y*1-2])+(x+1);
                    }
                    if(((x+1)<9) && y*1+2<9){
                        result[6] = (alfa[y*1+2])+(x+1);
                    }
                    if(((x+2)<9) && y*1-1>0){
                        result[7] = (alfa[y*1-1])+(x+2);
                    }
                    if(((x+2)<9) && y*1+1<9){
                        result[8] = (alfa[y*1+1])+(x+2);
                    }

                    return result;
                    break;
                case 'black':

                    return result;
                    break;
            }
        },
        ferzMoves: function(){
            var result = {}, self = this;
            switch (this.options.side) {
                case 'white':
                    var move_length = 1;
                    if(self.options.coords.x == 2) {
                        move_length = 2;
                    }

                    for(var i=1; i<=move_length; i++) {
                        result[i] = self.options.coords.y + (self.options.coords.x + i);
                    }
                    return result;
                    break;
                case 'black':
                    var move_length = 1;
                    if(self.options.coords.x == 7) {
                        move_length = 2;
                    }

                    for(var i=1; i<=move_length; i++) {
                        result[i] = self.options.coords.y + (self.options.coords.x - i);
                    }
                    return result;
                    break;
            }
        },
    };
}
