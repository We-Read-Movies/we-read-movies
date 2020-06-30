export function getFluidImage(image) {
    if (!image) return null;

    return image.childImageSharp.fluid;
}

export function getBannerImage(image) {
    if (!image) return null;

    return image.childImageSharp.resize;
}
