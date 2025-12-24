import { useThree } from '@react-three/fiber';

export default function ScreenshotButton() {
    const { gl } = useThree();

    const handleScreenshot = () => {
        try {
            const dataUrl = gl.domElement.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `my-christmas-tree-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Screenshot failed:', error);
        }
    };

    // This component renders nothing but provides the screenshot functionality
    // The actual button is rendered in the HTML overlay
    return null;
}

// Export the screenshot handler for use in App
export function createScreenshotHandler(gl) {
    return () => {
        try {
            const dataUrl = gl.domElement.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `my-christmas-tree-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Screenshot failed:', error);
        }
    };
}
