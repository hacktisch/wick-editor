/* Wick - (c) 2017 Zach Rispoli, Luca Damasco, and Josh Rispoli */

/*  This file is part of Wick. 
    
    Wick is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Wick is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Wick.  If not, see <http://www.gnu.org/licenses/>. */
    
var CursorIconInterface = function (wickEditor) {

    var cursorIconDiv = document.getElementById('cursorIcon');

    this.setup = function () {
        document.body.addEventListener('mousemove', function(e) { 

            var imgOffset = {x:5, y:15}

            if(wickEditor.currentTool instanceof Tools.FillBucket) {
                imgOffset.x = 0;
                imgOffset.y = 2;
            }

            cursorIconDiv.style.top = e.y + imgOffset.y + 'px';
            cursorIconDiv.style.left = e.x + imgOffset.x + 'px';
        });
    }

    this.syncWithEditorState = function () {

    }

    this.hide = function () {
        cursorIconDiv.style.display = 'none';
    }

    this.setImageForPaperEvent = function (event) {
        if(event.item && event.item.wick && 
           !wickEditor.project.isObjectSelected(event.item.wick)) {
            wickEditor.cursorIcon.setImage('resources/cursor-fill.png')
            return;
        }

        var hitOptions = {
            segments: true,
            fill: true,
            curves: true,
            handles: true,
            stroke: true,
            tolerance: 5 / wickEditor.canvas.getZoom()
        }

        hitResult = paper.project.hitTest(event.point, hitOptions);
        if(hitResult) {
            if (hitResult.item._wickInteraction) {
                wickEditor.cursorIcon.hide()
            } else if(hitResult.item.parent && hitResult.item.parent._isPartOfGroup) {
                wickEditor.cursorIcon.hide()
            } else if(hitResult.type === 'curve' || hitResult.type === 'stroke') {
                wickEditor.cursorIcon.setImage('resources/cursor-curve.png')
            } else if(hitResult.type === 'fill') {
                wickEditor.cursorIcon.setImage('resources/cursor-fill.png')
            } else if(hitResult.type === 'segment' ||
                      hitResult.type === 'handle-in' ||
                      hitResult.type === 'handle-out') {
                wickEditor.cursorIcon.setImage('resources/cursor-segment.png')
            } else {
                wickEditor.cursorIcon.hide()
            }
        } else {
            wickEditor.cursorIcon.hide()
        }
    }

    this.setImage = function (url) {
        cursorIconDiv.style.backgroundImage = 'url('+url+')'
        cursorIconDiv.style.display = "block";
    }

}