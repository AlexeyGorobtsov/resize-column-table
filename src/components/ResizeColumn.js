import React, {useEffect} from "react";

export function useResizeColumn(tableEl) {
    const listeners = [];
    useEffect(() => {
        resizableGrid(tableEl.current);

        return () => {
             listeners.forEach(item => {
                item.node.removeEventListener(item.event, item.handle)
            })
        }
    }, [tableEl]);

    function resizableGrid(table) {
        const arrayRow = Array.from(table.querySelectorAll('tr'));
        const [row] = arrayRow || [];
        const cols = row ? Array.from(row.children) : null;
        if (!cols) return;
        table.style.overflow = 'hidden';

        cols.forEach(th => {
            const div = createDiv();
            th.appendChild(div);
            css(th, {'position': 'relative'});
            setListeners(div);
        });

        function setListeners(div) {
            let pageX;
            let curColWidth;
            let nxtColWidth;
            let curCol;
            let nxtCol;

            const handleMouseDown = e => {
                curCol = e.target.parentElement;
                nxtCol = curCol.nextElementSibling;
                pageX = e.pageX;

                const padding = paddingDiff(curCol);
                curColWidth = curCol.offsetWidth - padding;
                if(nxtCol) {
                    nxtColWidth = nxtCol.offsetWidth - padding;
                    console.log({nxtColWidth})
                }
            };

            div.addEventListener('mousedown', handleMouseDown);
            listeners.push({node: div, event: 'mousedown', handle: handleMouseDown});

            const handleMouseMove = e => {
                if(curCol) {
                    const diffX = e.pageX - pageX;
                    if (nxtCol) {
                        nxtCol.style.width = `${(nxtColWidth - diffX)}px`;
                    }
                    curCol.style.width = `${(curColWidth + diffX)}px`
                }
            };
            document.addEventListener('mousemove', handleMouseMove);

            listeners.push({node: div, event: 'mousemove', handle: handleMouseMove});

            const handleMouseup = e => {
                curCol = null;
                nxtCol = null;
                pageX = null;
                nxtColWidth = null;
                curColWidth = null;
            };
            document.addEventListener('mouseup', handleMouseup);

            listeners.push({node: div, event: 'mouseup', handle: handleMouseup});
        }

        function createDiv() {
            const div = document.createElement('div');
            div.classList.add('drag-handle');
            css(div, {
                'top': 0,
                'right': 0,
                'width': '12px',
                'position': 'absolute',
                'cursor': 'col-resize',
                'userSelect': 'none',
                'height': '18px'
            });

            return div;
        }

        function css(el, styles) {
            Object.keys(styles).forEach(key => el.style[key] = styles[key]);
        }

        function paddingDiff(col) {
            if (getStyleVal(col, 'box-sizing') === 'border-box') {
                return 0
            }

            const padLeft = getStyleVal(col, 'padding-left');
            const padRight = getStyleVal(col, 'padding-right');

            return (parseInt(padLeft) + parseInt(padRight));
        }

        function getStyleVal(el, css) {

            return (window.getComputedStyle(el, null).getPropertyValue(css))
        }
    }
}
