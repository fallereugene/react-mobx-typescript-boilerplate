type SuccessResponse = {
    statusCode: number;
    data: any;
    headers: Partial<Record<string, string>>;
    error: null;
};

export default SuccessResponse;
