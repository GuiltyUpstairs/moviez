import React from 'react'

export function CircularAvatar({user}) {
    return (
        <div className="space-x-6">
            <img
                className="inline-block h-6 w-6 rounded-full"
                src={user.image}
                alt={user.name}
            />
        </div>
    )
}