const EXTENSION_TO_FORMAT = {
    stl: 'stl',
    obj: 'obj',
    step: 'step',
    stp: 'step',
    iges: 'iges',
    igs: 'iges',
    brep: 'brep',
    dxf: 'dxf',
    svg: 'svg',
    dcprt: 'dcprt',
};
export function detectFormat(fileName) {
    const dot = fileName.lastIndexOf('.');
    if (dot < 0)
        return null;
    const extension = fileName.slice(dot + 1).toLowerCase();
    return EXTENSION_TO_FORMAT[extension] ?? null;
}
export function is3DFormat(format) {
    return format === 'stl' || format === 'obj' || format === 'step' || format === 'iges' || format === 'brep' || format === 'dcprt';
}
