import React, {useState, useCallback} from 'react';
import {useResizeColumn} from './ResizeColumn';

export const Table = props => {
    const [node, setNode] = useState(null);
    const tableRef = useCallback(node => {
        if (node !== null) {
            setNode(node);
        }
    }, []);
    useResizeColumn(node);
    return (
        <div className="App">
            <table ref={tableRef} id={'tableId'}>
                <thead>
                <tr>
                    <th>
                        <input type={'checkbox'}/>
                    </th>
                    <th>Size</th>
                    <th>File</th>
                    <th>File</th>
                </tr>
                <tr>
                    <th><input type="text" className={'select-input'}/></th>
                    <th><input type="text" className={'select-input'}/></th>
                    <th><input type="text" className={'select-input'}/></th>
                    <th><input type="text" className={'select-input'}/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type={'checkbox'}/></td>
                    <td>10Mb Lorem ipsum dolor sit amet</td>
                    <td>C:\User\BrainBell</td>
                    <td>C:\User\BrainBell</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};