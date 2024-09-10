exports.handler = async () => {
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ message: `Hello, World from zip from S3 via github actions!` }),
    };
};