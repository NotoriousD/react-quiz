export const getMobileOperatingSystemAndRedirect = (link: string) => {
    //@ts-ignore
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent) || /windows phone/i.test(userAgent)) {
        return window.open(link, '_system');
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    //@ts-ignore
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return window.open(`diia.app://${link.replace('https://', '')}`, '_system');;
    }

    return "unknown";
}