using BusReservationNET.DTO;
using BusReservationNET.Models;

namespace BusReservationNET.Services
{
    public interface IUserService
    {
        Task<User> AddAgentAsync(User user);
        Task<IEnumerable<User>> GetAllAgentsAsync();

        Task<User> RegisterUserAsync(UserDTO dto);
        Task<User> UpdateUserAsync(long id, EditUserDTO dto);
        Task<List<User>> GetAllCustomersAsync();
        Task<User> GetUserByIdAsync(long id);

        Task<User?> Authenticate(string email, string password);
    }
}
