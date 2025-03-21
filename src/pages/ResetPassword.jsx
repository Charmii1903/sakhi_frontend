import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        address: '',
        phone: '',
        profilePicture: ''
    });

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data?.data) {
                    setFormData((prev) => ({ ...prev, ...response.data.data }));
                } else {
                    setError("Profile data not found.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); // ✅ No unnecessary dependencies

    // Handle input changes
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/profile', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            alert(response.data.message);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Failed to update profile');
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Profile Picture URL</label>
                    <input
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-300"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
