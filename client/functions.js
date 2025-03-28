export const getDataFunction = async url => {
    const getData = async url => {
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    try {
        const data = await getData(url)
        return data
    } catch (error) {
        console.log(`Произошла ошибка в getData, ${error.message}`)
    }
}


export const postDataFunction = async (url, obj) => {
	const postData = async (url, obj) => {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
		const json = await res.json()
		return json
	}

	try {
		const data = await postData(url, obj)
		return data
	} catch (error) {
		console.log(`Произошла ошибка в postData, ${error.message}`)
	}
}


export const patchDataFunction = async (url, id, name) => {
    const patchData = async (url, id, name) => {
        console.log(`${url}/${id}`)
        const res = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

        if (!res.ok) throw new Error(`Ошибка при запросе ${res.status}`)

        const text = await res.text()
        try {
            return JSON.parse(text)
        } catch (err) {
            throw new Error('сервер вернул не JSON')
        }
    }

    try {
        const data = await patchData(url, id, name)
        console.log('Пользователь изменён')
        return data
    } catch (error) {
        console.log(`Произошла ошибка в patchData, ${error.message}`)
    }
}