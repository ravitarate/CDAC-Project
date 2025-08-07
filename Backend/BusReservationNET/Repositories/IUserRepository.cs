using BusReservationNET.Models;

namespace BusReservationNET.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddAgentAsync(User user);
        Task<IEnumerable<User>> GetAllAgentsAsync();
        User GetById(long userId);

        Task<User> RegisterUserAsync(User user);

        Task<User> AddUserAsync(User user);
        Task<User> UpdateUserAsync(long id, User user);
        Task<List<User>> GetAllCustomersAsync();
        Task<User> GetByIdAsync(long id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
    }
}
