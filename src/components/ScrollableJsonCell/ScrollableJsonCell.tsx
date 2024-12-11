import React, { useState, CSSProperties } from 'react';

const ScrollableJsonCell = ({ value }: { value: any }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleDoubleClick = (jsonData: any) => {
        setModalContent(JSON.stringify(jsonData, null, 2));
        setModalOpen(true);
    };

    const style: CSSProperties = {
        // overflowX: "auto",
        wordWrap: "break-word"
    };
    return (
        <>
            <div style={style} onDoubleClick={() => handleDoubleClick(value)}>
                {JSON.stringify(value, null, 2).slice(0,200)}
            </div>

            {isModalOpen && (
                <div className='modalContent'>
                    <button onClick={() => setModalOpen(false)}>Close</button>
                    <pre>{modalContent}</pre>
                </div>
            )}
        </>
    );

}
export default ScrollableJsonCell;