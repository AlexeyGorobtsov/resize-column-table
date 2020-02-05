import React, {useRef, useEffect} from "react";
import "./styles.css";

export default function App() {
    const tableEl = useRef(null);

    useEffect(() => {
        resizableGrid(tableEl.current);
    }, []);

    function resizableGrid(table) {
        const arrayRow = Array.from(table.querySelectorAll('tr'));
        const [row] = arrayRow || [];
        const cols = row ? Array.from(row.children) : null;
        if (!cols) return;

        table.style.overflow = 'hidden';
        const tableHeight = table.offsetHeight;

        cols.forEach(th => {
            const div = createDiv(tableHeight);
            console.log({th, div});
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

            div.addEventListener('mousedown', e => {
                curCol = e.target.parentElement;
                nxtCol = curCol.nextElementSibling;
                pageX = e.pageX;
                console.log('mousedown');

                const padding = paddingDiff(curCol);
                curColWidth = curCol.offsetWidth - padding;
                if(nxtCol) {
                    nxtColWidth = nxtCol.offsetWidth - padding;
                }
            });

            div.addEventListener('mouseover', e => {
               e.target.style.borderRight = '2px solid #0000ff';
            });

            div.addEventListener('mouseout', e => {
                e.target.style.borderRight = ''
            });

            document.addEventListener('mousemove', e => {
                if(curCol) {
                    const diffX = e.pageX - pageX;
                    if (nxtCol) {
                        nxtCol.style.width = `${(nxtColWidth - diffX)}px`;
                    }
                    curCol.style.width = `${(curColWidth + diffX)}px`
                }
            });

            document.addEventListener('mouseup', e => {
               curCol = null;
               nxtCol = null;
               pageX = null;
               nxtColWidth = null;
               curColWidth = null;
            });
        }

        function createDiv(height) {
            const div = document.createElement('div');
            css(div, {
                'top': 0,
                'right': 0,
                'width': '5px',
                'position': 'absolute',
                'cursor': 'col-resize',
                'userSelect': 'none',
                'height': `${height}px`
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

    return (
        <div className="App">
            <table ref={tableEl} id={'tableId'}>
                <thead>
                <tr>
                    <th>
                        <input type={'checkbox'}/>
                    </th>
                    <th>Size</th>
                    <th>File</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type={'checkbox'}/></td>
                    <td>10Mb</td>
                    <td>C:\User\BrainBell</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
