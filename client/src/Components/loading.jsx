
const Loading = ({isLoading}) => (
    isLoading && (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div className="spinner" style={{
                width: 48,
                height: 48,
                border: '6px solid #f3f3f3',
                borderTop: '6px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    )
);

export default Loading;
