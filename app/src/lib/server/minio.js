import Minio from 'minio';
export const minioClient = new Minio.Client({
	endPoint: 'unipetminio.ostap.io',
	port: 443,
	useSSL: true,
	accessKey: 'inacap',
	secretKey: 'inacap123'
});
export function toBuffer(ab) {

	var buf = new Buffer(ab.byteLength);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		buf[i] = view[i];
	}
	return buf;
}
