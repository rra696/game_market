exports.resolveError = (err) => {
    return err.errors.map(
        err => {
            return {
                field: err.path,
                message: err.message
            }
        }
    )
}